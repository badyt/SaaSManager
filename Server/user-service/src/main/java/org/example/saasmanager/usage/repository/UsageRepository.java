package org.example.saasmanager.usage.repository;

import org.example.shared.entities.UsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UsageRepository extends JpaRepository<UsageLog, Integer> {

    @Query("SELECT u FROM UsageLog u " +
            "WHERE (:userName IS NULL OR LOWER(u.license.user.name) LIKE CONCAT(LOWER(CAST(:userName AS text)),'%')) " +
            "AND (:toolName IS NULL OR LOWER(u.license.subscription.tool.name) LIKE CONCAT(LOWER(CAST(:toolName AS text)),'%')) " +
            "AND (COALESCE(:startDate, u.activityDate) <= u.activityDate) " +
            "AND (COALESCE(:endDate, u.activityDate) >= u.activityDate) " +
            "AND (:activityType IS NULL OR LOWER(u.activityType) LIKE CONCAT(LOWER(CAST(:activityType AS text)),'%'))")
    List<UsageLog> findUsageLogsWithFilters(
            @Param("userName") String userName,
            @Param("toolName") String toolName,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("activityType") String activityType
    );

    @Query("SELECT u.license.licenseId, u.license.user.name as userName, " +
            "u.license.subscription.tool.name as toolName, "+
            "u.license.subscription.tool.defaultCost as licenseCost, " +
            "u.license.allocatedAt, " +
            "COUNT(u) as activityCount " +
            "FROM UsageLog u " +
            "WHERE u.activityDate >= :startDate " +
            "AND u.license.allocatedAt <= :startDate " +
            "GROUP BY u.license.licenseId, u.license.user.name, u.license.subscription.tool.name, " +
            "u.license.subscription.tool.defaultCost, u.license.allocatedAt " +
            "HAVING COUNT(u) < :threshold")
    List<Object[]> findUnderutilizedSubscriptions(
            @Param("startDate") LocalDateTime startDate,
            @Param("threshold") Integer threshold);

    @Query("SELECT DISTINCT u.license.licenseId FROM UsageLog u WHERE u.activityDate >= :startDate")
    List<Integer> findAllActiveLicenseIds(@Param("startDate") LocalDateTime startDate);

}
