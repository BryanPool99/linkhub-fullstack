package com.bryandev.linkhub.model.dto.response;


import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PreviewDataDto {
    private String pictureUrl;
    private String username;
    private String description;
    private List<LinkDto> links;
}
