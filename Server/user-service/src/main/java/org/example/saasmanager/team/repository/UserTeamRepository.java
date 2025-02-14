package org.example.saasmanager.team.repository;

import net.saas.shared.entities.Team;
import net.saas.shared.entities.User;
import net.saas.shared.entities.UserTeam;
import net.saas.shared.entities.UserTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserTeamRepository extends JpaRepository<UserTeam, UserTeamId> {
    boolean existsByUserUserIdAndTeamTeamId(Integer userId, Integer teamId);

    @Query("SELECT ut.team FROM UserTeam ut WHERE ut.user.userId = :userId")
    List<Team> findTeamsByUserId(@Param("userId") Integer userId);

    @Query("SELECT ut FROM UserTeam ut WHERE ut.user.userId = :userId AND ut.team.teamId = :teamId")
    Optional<UserTeam> findByUserIdAndTeamId(@Param("userId") Integer userId, @Param("teamId") Integer teamId);

    @Query("SELECT ut.user FROM UserTeam ut WHERE ut.team.teamId = :teamId")
    List<User> findUsersByTeamId(@Param("teamId") Integer teamId);


}
