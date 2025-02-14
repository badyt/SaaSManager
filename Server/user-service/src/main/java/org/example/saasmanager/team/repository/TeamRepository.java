package org.example.saasmanager.team.repository;
import net.saas.shared.entities.Team;
import net.saas.shared.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    // Find by team name
    Optional<Team> findByTeamName(String teamName);

    // Find teams created by a specific user
    List<Team> findByCreatedBy(User user);

    boolean existsByTeamName(String teamName);
}