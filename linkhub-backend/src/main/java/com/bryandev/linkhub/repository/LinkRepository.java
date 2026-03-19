package com.bryandev.linkhub.repository;

import com.bryandev.linkhub.model.dto.response.LinkDto;
import com.bryandev.linkhub.model.entitIes.LinkEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface LinkRepository extends R2dbcRepository<LinkEntity,Integer> {
    @Query(value = """
            select
                l.id as id,l.title as title,
                l.url as url,l.is_active as isactive
            from links l
            inner join users u on u.id = l.user_id
            where u.username = :nameUser
            """)
    Flux<LinkDto> findLinksDtoByUsername(String nameUser);
}
