package org.example.saasmanager.team.mapper;

import com.example.teams.model.TeamDTO;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.Team;
import org.example.shared.entities.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface TeamMapper {

    @Mapping(source = "teamId", target = "id")
    @Mapping(source = "teamName", target = "name")
    @Mapping(source = "createdBy.userId", target = "createdBy")
    TeamDTO toTeamDTO(Team team);

    @Mapping(source = "id", target = "teamId")
    @Mapping(source = "name", target = "teamName")
    @Mapping(source = "createdBy", target = "createdBy", qualifiedByName = "userIdToUser")
    Team toTeam(TeamDTO teamDTO, @Context UserRepository userRepository);

    // List mappings
    List<TeamDTO> toDtoList(List<Team> teams);

    List<Team> toEntityList(List<TeamDTO> TeamDTOs, @Context UserRepository userRepository);

    // Custom mapping method for LocalDateTime -> OffsetDateTime
    @Named("localDateTimeToOffsetDateTime")
    default OffsetDateTime localDateTimeToOffsetDateTime(LocalDateTime localDateTime) {
        return localDateTime != null ? localDateTime.atOffset(ZoneOffset.UTC) : null;
    }

    // Custom mapping method for OffsetDateTime -> LocalDateTime
    @Named("offsetDateTimeToLocalDateTime")
    default LocalDateTime offsetDateTimeToLocalDateTime(OffsetDateTime offsetDateTime) {
        return offsetDateTime != null ? offsetDateTime.toLocalDateTime() : null;
    }

    @Named("userIdToUser")
    default User mapUserIdToUser(Integer userId, @Context UserRepository userRepository) {
        if (userId == null) {
            return null;
        }
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    @Named("userToUserId")
    default Integer mapUserToUserId(User user) {
        return user != null ? user.getUserId() : null;
    }

}
