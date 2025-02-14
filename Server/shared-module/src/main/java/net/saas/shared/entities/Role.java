package net.saas.shared.entities;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import net.saas.shared.enums.RoleName;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleName roleName;
}