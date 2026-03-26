package com.bryandev.linkhub.repository;

import com.bryandev.linkhub.model.dto.response.LinkDto;
import com.bryandev.linkhub.model.entitIes.LinkEntity;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    @Query(value = """
            select
                l.id as id,l.title as title,
                l.url as url,l.is_active as isactive
            from links l
            inner join users u on u.id = l.user_id
            where u.username = :nameUser and l.is_active is TRUE
            """)
    Flux<LinkDto> findLinksDtoByUsernameAndStateActive(String nameUser);

    @Query(value = """
            select count(l.id) as total from links l
            inner join users u on u.id = l.user_id
            where u.username = :nameUser
            """)
    Mono<Integer> countTotalLinksByUsername(String nameUser);

    @Query(value = """
            UPDATE links SET position = position - 1
            WHERE user_id = (SELECT id FROM users WHERE username = :nameUser)
            AND position > :deletedPosition
            """)
    Mono<Integer>updatePositionAfterDelete(String nameUser,Integer deletedPosition);

    @Query(value = """
            select l.position from links l
            inner join users u on u.id = l.user_id
            where u.username = :nameUser and l.id = :linkId
            """)
    Mono<Integer> findPositionByLinkIdAndUsername(Integer linkId,String nameUser);

    @Query(value = """
            select l.*
            from links l
            inner join users u on u.id = l.user_id
            where u.username = :nameUser and l.id = :linkId
           """)
    Mono<LinkEntity> findLinkByUsernameAndId(String nameUser,Integer linkId);
}
