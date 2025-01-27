package org.example.saasmanager.usage.repository;

import org.example.shared.entities.UsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UsageRepository extends JpaRepository<UsageLog, Integer> {

    @Query("SELECT u FROM UsageLog u " +
            "WHERE (:userId IS NULL OR u.user.userId = :userId) " +
            "AND (:toolId IS NULL OR u.subscription.tool.toolId = :toolId) " +
            "AND (:startDate IS NULL OR u.activityDate >= :startDate) " +
            "AND (:endDate IS NULL OR u.activityDate <= :endDate) " +
            "AND (:activityType IS NULL OR u.activityType = :activityType)")
    List<UsageLog> findUsageLogsWithFilters(
            @Param("userId") Integer userId,
            @Param("toolId") Integer toolId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("activityType") String activityType
    );

    @Query("SELECT u.subscription.subscriptionId, u.user.userId, u.user.name as userName, " +
            "u.subscription.tool.name as toolName,COUNT(u) as activityCount " +
            "FROM UsageLog u " +
            "WHERE u.activityDate >= :startDate " +
            "GROUP BY u.subscription.subscriptionId, u.user.userId,u.user.name, u.subscription.tool.name  " +
            "HAVING COUNT(u) < :threshold")
    List<Object[]> findUnderutilizedSubscriptions(
            @Param("startDate") LocalDateTime startDate,
            @Param("threshold") Long threshold);


}
