package org.example.saasmanager.usage.controller;

import com.example.usage_monitoring.api.UsageApi;
import com.example.usage_monitoring.model.UnderutilizedSubscription;
import com.example.usage_monitoring.model.UsageLogDTO;
import com.example.usage_monitoring.model.UsageLogRequest;
import org.example.saasmanager.usage.service.UsageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
public class UsageController implements UsageApi {
    private final UsageService usageService;

    public UsageController(UsageService usageService) {
        this.usageService = usageService;
    }

    @Override
    public ResponseEntity<List<UsageLogDTO>> getLogs(Integer userId,
                                                     Integer toolId,
                                                     OffsetDateTime startDate,
                                                     OffsetDateTime endDate,
                                                     String activityType) {
        List<UsageLogDTO> logs = usageService.getLogs(userId, toolId, startDate, endDate, activityType);
        return ResponseEntity.ok(logs);
    }

    @Override
    public ResponseEntity<List<UnderutilizedSubscription>> getUnderutilized(Integer threshold, String period) {
        List<UnderutilizedSubscription> underutilizedSubscriptions =
                usageService.getUnderutilizedSubscriptions(threshold, period);
        return ResponseEntity.ok(underutilizedSubscriptions);
    }

    @Override
    public ResponseEntity<UsageLogDTO> logUserInteraction(UsageLogRequest usageLogRequest) {
        UsageLogDTO createdLog = usageService.logUserInteraction(usageLogRequest);
        return new ResponseEntity<>(createdLog, HttpStatus.CREATED);
    }
}
