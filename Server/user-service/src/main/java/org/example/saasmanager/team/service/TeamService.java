package org.example.saasmanager.team.service;

import com.example.teams.model.*;
import org.example.saasmanager.team.mapper.TeamMapper;
import org.example.saasmanager.team.repository.TeamRepository;
import org.example.saasmanager.team.repository.UserTeamRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.Team;
import org.example.shared.entities.User;
import org.example.shared.entities.UserTeam;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;
    private final TeamMapper teamMapper;

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository
    , UserTeamRepository userTeamRepository, TeamMapper teamMapper) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.userTeamRepository = userTeamRepository;
        this.teamMapper = teamMapper;
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
        newTeam.setDescription(request.getDescription());
        newTeam.setCreatedBy(creator);
        Team savedTeam = teamRepository.save(newTeam);
        CreateTeamResponse response = new CreateTeamResponse();
        response.setTeamId(savedTeam.getTeamId());
        response.setTeamName(savedTeam.getTeamName());
        return response;
    }

    public List<TeamDTO> getUserTeams(){
        // Retrieve userId from the request attribute
        String userId = (String) ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest()
                .getAttribute("userId");

        // Use the userId to fetch teams
        List<Team> teams = userTeamRepository.findTeamsByUserId(Integer.parseInt(userId));
        return teamMapper.toDtoList(teams);
    }

    public List<TeamDTO> getAllTeams(){
        List<Team> teams = teamRepository.findAll();
        return teamMapper.toDtoList(teams);
    }

    public void removeUserFromTeam(Integer teamId, RemoveUserRequest removeUserRequest){
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(removeUserRequest.getUserId(),teamId)
                .orElseThrow(() -> new IllegalArgumentException("UserTeam not found" ));
        userTeamRepository.delete(userTeam);
    }

    public List<TeamWithUsersDTO> getAllTeamsWithUsers() {
        // Fetch all teams
        List<Team> teams = teamRepository.findAll();

        // Map teams to DTOs with user details
        return teams.stream().map(team -> {
            List<User> users = userTeamRepository.findUsersByTeamId(team.getTeamId());

            // Convert users to UserDTO
            List<UserInTeamDTO> userDTOs = users.stream().map(user -> {
                UserInTeamDTO userDTO = new UserInTeamDTO();
                userDTO.setUserId(user.getUserId());
                userDTO.setUserName(user.getName());
                return userDTO;
            }).collect(Collectors.toList());

            // Create TeamWithUsersDTO
            TeamWithUsersDTO teamWithUsersDTO = new TeamWithUsersDTO();
            teamWithUsersDTO.setTeam(teamMapper.toTeamDTO(team));
            teamWithUsersDTO.setUsers(userDTOs);

            return teamWithUsersDTO;
        }).collect(Collectors.toList());
    }
}
