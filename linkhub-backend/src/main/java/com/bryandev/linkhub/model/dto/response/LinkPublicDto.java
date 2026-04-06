package com.bryandev.linkhub.model.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LinkPublicDto {
    private Integer id;
    private String title;
    private String url;
    private String iconType;
}
