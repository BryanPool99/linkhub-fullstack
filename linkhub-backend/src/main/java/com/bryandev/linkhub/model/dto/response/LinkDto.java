package com.bryandev.linkhub.model.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LinkDto {
    private Integer id;
    private String title;
    private String url;
    private Boolean isactive;
}
