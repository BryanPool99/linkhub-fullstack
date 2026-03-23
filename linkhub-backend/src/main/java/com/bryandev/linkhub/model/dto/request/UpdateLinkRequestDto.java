package com.bryandev.linkhub.model.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateLinkRequestDto {
    private String title;
    private String url;
    //private String iconType;
    private Integer position;
    private Boolean isActive;
}
