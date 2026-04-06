package com.bryandev.linkhub.model.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PublicProfileDto {
    private String urlImg;
    private String username;
    private String title;
    private String bio;
    private String themeColor;
    private List<LinkPublicDto> links;
}
