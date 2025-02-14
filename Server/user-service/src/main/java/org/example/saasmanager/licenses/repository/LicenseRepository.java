package org.example.saasmanager.licenses.repository;

import net.saas.shared.entities.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LicenseRepository extends JpaRepository<License,Integer> {
    @Query("SELECT COUNT(l) FROM License l WHERE l.subscription.subscriptionId = :subscriptionId")
    int countBySubscriptionId(@Param("subscriptionId") Integer subscriptionId);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN TRUE ELSE FALSE END " +
            "FROM License l WHERE l.subscription.subscriptionId = :subscriptionId AND l.user.userId = :userId")
    boolean existsBySubscriptionIdAndUserId(@Param("subscriptionId") Integer subscriptionId, @Param("userId") Integer userId);


    @Query("SELECT l FROM License l WHERE l.subscription.subscriptionId = :subscriptionId")
    List<License> findAllBySubscriptionId(@Param("subscriptionId") Integer subscriptionId);

    @Query("SELECT l FROM License l WHERE l.user.userId = :userId")
    List<License> findAllByUserId(@Param("userId") Integer userId);

    @Query("SELECT l FROM License l " +
            "JOIN UserTeam ut ON ut.user.userId = l.user.userId " +
            "WHERE ut.team.teamId = :teamId")
    List<License> findLicensesByTeamId(@Param("teamId") Integer teamId);

}
