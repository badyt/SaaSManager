package org.example.saasmanager.team.controller;

import com.example.teams.api.TeamsApi;
import com.example.teams.model.AddUserRequest;
import com.example.teams.model.CreateTeamRequest;
import com.example.teams.model.CreateTeamResponse;
import com.example.teams.model.TeamDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.example.saasmanager.team.mapper.TeamMapper;
import org.example.saasmanager.team.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamController implements TeamsApi {
    private final TeamService teamService;
   ;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;

    }

    @Override
    public ResponseEntity<Void>  addUserToTeam(Integer teamId, AddUserRequest addUserRequest){
        teamService.addUserToTeam(addUserRequest.getUserId(), teamId);
        return ResponseEntity.ok().build();

    }

    @Override
    public  ResponseEntity<CreateTeamResponse> createTeam(CreateTeamRequest createTeamRequest){
        CreateTeamResponse createdTeam = teamService.createTeam(createTeamRequest);
        return new ResponseEntity<CreateTeamResponse>(createdTeam,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<TeamDTO>> getUserTeams() {
        List<TeamDTO> teams = teamService.getUserTeams(); // Service handles userId extraction
        return ResponseEntity.ok(teams);
    }
}
