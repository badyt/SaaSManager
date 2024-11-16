package org.example.saasmanager.user.mapper;

import com.example.users.model.UserDTO;
import org.example.saasmanager.user.repository.RoleRepository;
import org.example.shared.entities.Role;
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
public interface UserMapper {

    // Map User to UserDTO with custom date conversion
    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "localDateTimeToOffsetDateTime")
    @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "localDateTimeToOffsetDateTime")
    @Mapping(source = "role", target = "role", qualifiedByName = "roleToRoleId")
    UserDTO toDto(User user);

    // Map UserDTO to User with custom date conversion
    @Mapping(source = "createdAt", target = "createdAt", qualifiedByName = "offsetDateTimeToLocalDateTime")
    @Mapping(source = "updatedAt", target = "updatedAt", qualifiedByName = "offsetDateTimeToLocalDateTime")
    @Mapping(source = "role", target = "role", qualifiedByName = "roleIdToRole")
    User toEntity(UserDTO userDTO, @Context RoleRepository roleRepository);

    // List mappings
    List<UserDTO> toDtoList(List<User> users);

    List<User> toEntityList(List<UserDTO> userDTOs, @Context RoleRepository roleRepository);

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

    // Custom mapping method for Role -> Integer (role ID)
    @Named("roleToRoleId")
    default Integer roleToRoleId(Role role) {
        return role != null ? role.getRoleId() : null;
    }

    // Custom mapping method for Integer (role ID) -> Role
    @Named("roleIdToRole")
    default Role roleIdToRole(Integer roleId, @Context RoleRepository roleRepository) {
        if (roleId == null) {
            return null;
        }
        Optional<Role> role = roleRepository.findById(roleId);
        return role.orElse(null);
    }
}
