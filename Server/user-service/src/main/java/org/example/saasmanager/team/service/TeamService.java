package org.example.saasmanager.team.service;

import com.example.teams.model.CreateTeamRequest;
import com.example.teams.model.CreateTeamResponse;
import org.example.saasmanager.team.repository.TeamRepository;
import org.example.saasmanager.team.repository.UserTeamRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.Team;
import org.example.shared.entities.User;
import org.example.shared.entities.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository
    , UserTeamRepository userTeamRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.userTeamRepository = userTeamRepository;
    }

    public void addUserToTeam(Integer teamId, Integer userId) {
        if (userTeamRepository.existsByUserUserIdAndTeamTeamId(userId, teamId)) {
            throw new IllegalArgumentException("User is already part of this team.");
        }

        // Fetch the User and Team entities
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found with ID: " + teamId));

        // Create and save the UserTeam relationship
        UserTeam userTeam = new UserTeam();
        userTeam.setUser(user);
        userTeam.setTeam(team);

        userTeamRepository.save(userTeam);
    }

    public CreateTeamResponse createTeam(CreateTeamRequest request){

        User creator = userRepository.findById(request.getCreatedBy())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + request.getCreatedBy()));

        if (teamRepository.existsByTeamName(request.getTeamName())) {
            throw new IllegalArgumentException("Team name already exists");
        }
        Team newTeam = new Team();
        newTeam.setTeamName(request.getTeamName());
        newTeam.setCreatedBy(creator);
        Team savedTeam = teamRepository.save(newTeam);
        CreateTeamResponse response = new CreateTeamResponse();
        response.setTeamId(savedTeam.getTeamId());
        response.setTeamName(savedTeam.getTeamName());
        return response;
    }
}
