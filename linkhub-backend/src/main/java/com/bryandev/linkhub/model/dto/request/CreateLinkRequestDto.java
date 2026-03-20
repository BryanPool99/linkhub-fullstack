package com.bryandev.linkhub.model.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateLinkRequestDto {
    //private Integer userId; este id saldra del token(logica para el token que retorne el id)
    private String title;
    private String url;
    //private String iconType; habra una logica aparte
    //private Integer position; habra una logica aparte
    private Boolean isActive;
}
