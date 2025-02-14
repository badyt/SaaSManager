package org.example.saasmanager.user.repository;
import net.saas.shared.entities.Role;
import net.saas.shared.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(RoleName roleName);
}

