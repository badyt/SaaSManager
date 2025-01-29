package org.example.saasmanager.usage.service;

import com.example.usage_monitoring.model.UnderutilizedSubscription;
import com.example.usage_monitoring.model.UsageLogDTO;
import com.example.usage_monitoring.model.UsageLogRequest;
import org.example.saasmanager.licenses.repository.LicenseRepository;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.saasmanager.usage.mapper.UsageMapper;
import org.example.saasmanager.usage.repository.UsageRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.License;
import org.example.shared.entities.Subscription;
import org.example.shared.entities.UsageLog;
import org.example.shared.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsageService {
    private final UsageRepository usageRepository;
    private final LicenseRepository licenseRepository;
    private final UsageMapper usageMapper;

    @Autowired
    public UsageService(UsageRepository usageRepository, UsageMapper usageMapper
            ,  LicenseRepository licenseRepository) {
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

    public List<UnderutilizedSubscription> getUnderutilizedSubscriptions(int threshold, String period) {
        LocalDateTime startDate = calculateStartDate(period);
        List<Object[]> results = usageRepository.findUnderutilizedSubscriptions(startDate, (long) threshold);

        return results.stream()
                .map(result -> new UnderutilizedSubscription()
                        .licenseId((Integer) result[0])
                        .userName((String) result[1])
                        .toolName((String) result[2])
                        .activityCount((Integer) result[3])
                )
                .collect(Collectors.toList());
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
