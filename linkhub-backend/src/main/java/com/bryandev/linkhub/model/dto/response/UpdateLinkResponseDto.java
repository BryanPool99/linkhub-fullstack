package com.bryandev.linkhub.model.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateLinkResponseDto {
    private Integer id;
    private Integer userId;
    private String title;
    private String url;
    private String iconType;
    private Integer position;
    private Boolean isActive;
}
