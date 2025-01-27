package org.example.saasmanager.usage.service;

import com.example.usage_monitoring.model.UnderutilizedSubscription;
import com.example.usage_monitoring.model.UsageLogDTO;
import com.example.usage_monitoring.model.UsageLogRequest;
import org.example.saasmanager.subscriptions.repository.SubscriptionsRepository;
import org.example.saasmanager.usage.mapper.UsageMapper;
import org.example.saasmanager.usage.repository.UsageRepository;
import org.example.saasmanager.user.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final SubscriptionsRepository subscriptionsRepository;
    private final UsageMapper usageMapper;

    @Autowired
    public UsageService(UsageRepository usageRepository, UsageMapper usageMapper
            , UserRepository userRepository, SubscriptionsRepository subscriptionsRepository) {
        this.usageRepository = usageRepository;
        this.userRepository = userRepository;
        this.subscriptionsRepository = subscriptionsRepository;
        this.usageMapper = usageMapper;
    }

    @Transactional(readOnly = true)
    public List<UsageLogDTO> getLogs(
            Integer userId,
            Integer toolId,
            OffsetDateTime startDate,
            OffsetDateTime endDate,
            String activityType) {

        // Fetch logs with optional filters
        List<UsageLog> logs = usageRepository.findUsageLogsWithFilters(userId, toolId,
                startDate.toLocalDateTime(), endDate.toLocalDateTime(), activityType);
        return usageMapper.toDtoList(logs);
    }

    public List<UnderutilizedSubscription> getUnderutilizedSubscriptions(int threshold, String period) {
        LocalDateTime startDate = calculateStartDate(period);
        List<Object[]> results = usageRepository.findUnderutilizedSubscriptions(startDate, (long) threshold);

        return results.stream()
                .map(result -> new UnderutilizedSubscription()
                        .subscriptionId((Integer) result[0])
                        .userId((Integer) result[1])
                        .userName((String) result[2])
                        .toolName((String) result[3])
                        .activityCount((Integer) result[4])
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
        User user = userRepository.findById(usageLogRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Subscription subscription = subscriptionsRepository.findById(usageLogRequest.getSubscriptionId())
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));
        UsageLog usageLog = UsageLog.builder()
                .subscription(subscription).user(user)
                .activityType(usageLogRequest.getActivityType()).build();
        UsageLog savedUsageLog = usageRepository.save(usageLog);
        return usageMapper.toDto(savedUsageLog);
    }
}
