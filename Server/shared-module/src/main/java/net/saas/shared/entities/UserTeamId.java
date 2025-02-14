package net.saas.shared.entities;

import java.io.Serializable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserTeamId implements Serializable {
    private Integer user;
    private Integer team;


}
