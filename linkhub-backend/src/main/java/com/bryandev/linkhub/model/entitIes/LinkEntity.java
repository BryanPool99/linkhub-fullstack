package com.bryandev.linkhub.model.entitIes;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table(name = "links", schema = "linkhub")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LinkEntity {
    @Id
    //@Column("id")
    private Integer id;

    @Column("user_id")
    private Integer userId;

    //@Column("title")
    private String title;

    //@Column("url")
    private String url;

    @Column("icon_type")
    private String typeIcon;

    //@Column("position")
    private Integer position;

    @Column("is_active")
    private Boolean isActive;

    @Column("created_at")
    private LocalDateTime createdAt;
}
