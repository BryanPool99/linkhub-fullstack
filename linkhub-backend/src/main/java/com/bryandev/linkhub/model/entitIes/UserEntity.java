package com.bryandev.linkhub.model.entitIes;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table(name = "users", schema = "linkhub")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEntity {
    @Id
    private Integer id;
    //@Column("username")
    private String username;
    private String email;
    //@Column("password_hash")
    private String passwordHash;
    private String roles;
    private String displayName;
    private String bio;
    private String profilePictureUrl;
    private String themeColor;
    private LocalDateTime createdAt;
}
