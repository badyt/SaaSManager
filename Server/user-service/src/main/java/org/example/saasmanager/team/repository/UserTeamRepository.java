package org.example.saasmanager.team.repository;

import org.example.shared.entities.UserTeam;
import org.example.shared.entities.UserTeamId;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserTeamRepository extends JpaRepository<UserTeam, UserTeamId> {
    boolean existsByUserUserIdAndTeamTeamId(Integer userId, Integer teamId);
}
