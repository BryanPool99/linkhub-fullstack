package com.bryandev.linkhub.model.dto.request;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegisterRequestDto {
    private String username;
    private String email;
    private String password;
    private String roles;
}
