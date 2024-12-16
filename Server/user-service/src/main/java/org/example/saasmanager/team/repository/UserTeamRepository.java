package org.example.saasmanager.team.repository;

import org.example.shared.entities.Team;
import org.example.shared.entities.UserTeam;
import org.example.shared.entities.UserTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserTeamRepository extends JpaRepository<UserTeam, UserTeamId> {
    boolean existsByUserUserIdAndTeamTeamId(Integer userId, Integer teamId);

    @Query("SELECT ut.team FROM UserTeam ut WHERE ut.user.userId = :userId")
    List<Team> findTeamsByUserId(@Param("userId") Integer userId);
}
