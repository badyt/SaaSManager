package org.example.saasmanager.usage.service;

import com.example.usage_monitoring.model.UnderutilizedSubscription;
import com.example.usage_monitoring.model.UsageLogDTO;
import com.example.usage_monitoring.model.UsageLogRequest;
import org.example.saasmanager.licenses.repository.LicenseRepository;
import org.example.saasmanager.usage.mapper.UsageMapper;
import org.example.saasmanager.usage.repository.UsageRepository;
import net.saas.shared.entities.License;
import net.saas.shared.entities.UsageLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UsageService {
    private final UsageRepository usageRepository;
    private final LicenseRepository licenseRepository;
    private final UsageMapper usageMapper;

    @Autowired
    public UsageService(UsageRepository usageRepository, UsageMapper usageMapper
            , LicenseRepository licenseRepository) {
        this.usageRepository = usageRepository;
        this.licenseRepository = licenseRepository;
        this.usageMapper = usageMapper;
    }

    @Transactional(readOnly = true)
    public List<UsageLogDTO> getLogs(
            String userName,
            String toolName,
            OffsetDateTime startDate,
            OffsetDateTime endDate,
            String activityType) {

        // Convert to LocalDateTime only if not null, otherwise pass null
        LocalDateTime startDateTime = (startDate != null) ? startDate.toLocalDateTime() : null;
        LocalDateTime endDateTime = (endDate != null) ? endDate.toLocalDateTime() : null;

        // Fetch logs with optional filters
        List<UsageLog> logs = usageRepository.findUsageLogsWithFilters(userName, toolName,
                startDateTime, endDateTime, activityType);
        return usageMapper.toDtoList(logs);
    }

    @Transactional(readOnly = true)
    public List<UnderutilizedSubscription> getUnderutilizedSubscriptions(Integer threshold, String period) {
        LocalDateTime startDate = calculateStartDate(period);
        System.out.println(startDate);

        // Get all licenses from the repository
        List<License> allLicenses = licenseRepository.findAll();

        // Get underutilized subscriptions from usage logs
        List<Object[]> underutilizedResults = usageRepository.findUnderutilizedSubscriptions(startDate, threshold);

        // Extract underutilized license IDs
        Set<Integer> underutilizedLicenseIds = underutilizedResults.stream()
                .map(result -> (Integer) result[0]) // Extract licenseId from each record
                .collect(Collectors.toSet());

        // Get all active licenses that appeared in the logs (regardless of count)
        Set<Integer> activeLicenseIds = new HashSet<>(usageRepository.findAllActiveLicenseIds(startDate));

        // Convert underutilized subscriptions from logs into DTOs
        List<UnderutilizedSubscription> underutilizedSubscriptions = underutilizedResults.stream()
                .map(result -> new UnderutilizedSubscription()
                        .licenseId((Integer) result[0])
                        .userName((String) result[1])
                        .toolName((String) result[2])
                        .licenseCost((Integer) result[3])
                        .allocatedAt(((LocalDateTime) result[4]).atOffset(ZoneOffset.UTC))
                        .activityCount((Integer) result[5])
                )
                .collect(Collectors.toList());

        // Find licenses that have **zero** activities
        List<UnderutilizedSubscription> zeroActivityLicenses = allLicenses.stream()
                .filter(license ->
                        !underutilizedLicenseIds.contains(license.getLicenseId()) // Not in underutilized list
                                && !activeLicenseIds.contains(license.getLicenseId()) // Not in any usage logs
                                && license.getAllocatedAt().isBefore(LocalDateTime.now().minusDays(30)) // allocated before thi month
                )
                .map(license -> new UnderutilizedSubscription()
                        .licenseId(license.getLicenseId())
                        .userName(license.getUser().getName())  // Assuming License has User relation
                        .toolName(license.getSubscription().getTool().getName())  // Assuming License -> Subscription -> Tool
                        .licenseCost(license.getSubscription().getTool().getDefaultCost().intValue())
                        .allocatedAt(license.getAllocatedAt().atOffset(ZoneOffset.UTC))
                        .activityCount(0) // Zero activities
                )
                .toList();

        // Combine both underutilized and zero-activity licenses
        underutilizedSubscriptions.addAll(zeroActivityLicenses);
        return underutilizedSubscriptions;
    }

    private LocalDateTime calculateStartDate(String period) {
        if (period == null || !period.endsWith("d")) {
            throw new IllegalArgumentException("Invalid period format. Expected format: 'Xd', e.g., '30d'");
        }
        int days = Integer.parseInt(period.replace("d", ""));
        return LocalDateTime.now().minusDays(days);
    }

    public UsageLogDTO logUserInteraction(UsageLogRequest usageLogRequest) {
        License license = licenseRepository.findById(usageLogRequest.getLicenseId())
                .orElseThrow(() -> new IllegalArgumentException("license not found"));
        UsageLog usageLog = UsageLog.builder()
                .license(license)
                .activityType(usageLogRequest.getActivityType()).build();
        UsageLog savedUsageLog = usageRepository.save(usageLog);
        return usageMapper.toDto(savedUsageLog);
    }
}
