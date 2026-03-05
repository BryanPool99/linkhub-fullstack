package com.bryandev.linkhub.model.dto.request;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthRequestDto {
    //private String email;
    private String username;
    private String password;
}
