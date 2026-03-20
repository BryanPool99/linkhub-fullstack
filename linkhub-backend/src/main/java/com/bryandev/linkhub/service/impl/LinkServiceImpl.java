package com.bryandev.linkhub.service.impl;

import com.bryandev.linkhub.mapper.LinkMapper;
import com.bryandev.linkhub.model.dto.request.CreateLinkRequestDto;
import com.bryandev.linkhub.model.dto.response.CreateLinkResponseDto;
import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkDto;
import com.bryandev.linkhub.model.entitIes.LinkEntity;
import com.bryandev.linkhub.repository.LinkRepository;
import com.bryandev.linkhub.repository.UserRepository;
import com.bryandev.linkhub.security.JwtProvider;
import com.bryandev.linkhub.service.LinkService;
import com.bryandev.linkhub.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;

@Service//para el contexto de spring
@RequiredArgsConstructor//para hacer inyeccion de dependencia por constructor
@Slf4j//para los logs
public class LinkServiceImpl implements LinkService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final LinkMapper linkMapper;

    private final TransactionalOperator transactionalOperator;

    @Override
    public Mono<GenericResponseDto<List<LinkDto>>> getAllLinksByToken(String token) {
        //ACA VA LA LOGICA
        log.info("Inicio del método getAllLinksByToken");
        String username = jwtProvider.getUsernameFromToken(token);
        log.info("El username encontrado por token es:{}", username);
        return linkRepository.findLinksDtoByUsername(username).collectList()
                .map(ApiResponse::success)
                .doOnSuccess((v) ->
                        log.info("Fin del método getAllLinksByToken"));
    }

    @Override
    public Mono<GenericResponseDto<CreateLinkResponseDto>> createLinkByUsername(
            String token, CreateLinkRequestDto requestDto) {
        log.info("Inicio del método createLinkByUsername");
        String username = jwtProvider.getUsernameFromToken(token);
        return Mono.zip(
                linkRepository.countTotalLinksByUsername(username),
                userRepository.findByUsername(username)
        ).flatMap(tuple2 -> {
            var newLinkEntity = LinkEntity.builder()
                    //.id()
                    .userId(tuple2.getT2().getId())
                    .title(requestDto.getTitle())
                    .url(requestDto.getUrl())
                    //.typeIcon() falta este atributo
                    .position(tuple2.getT1() + 1)
                    .isActive(requestDto.getIsActive())
                    .createdAt(LocalDateTime.now())
                    .build();
            return linkRepository.save(newLinkEntity)
                    .as(transactionalOperator::transactional)
                    .map(linkEntity -> ApiResponse.success(
                            linkMapper.linkEntityToCreateLinkResponseDto(linkEntity)
                    ));
        }).doOnSuccess((v) ->
                log.info("Se creo el link correctamente con el id:{}", v.getData().getId()));
        /*
        return linkRepository.countTotalLinksByUsername(username)
                .flatMap(totalLinks -> {
                    var newLinkEntity = LinkEntity.builder()
                            //.id()
                            //.userId()//se necesita el id del usuario mediante el username
                            .title(requestDto.getTitle())
                            .url(requestDto.getUrl())
                            .position(totalLinks + 1)
                            .isActive(requestDto.getIsActive())
                            .createdAt(LocalDateTime.now())
                            .build();
                    return linkRepository.save(newLinkEntity);
                });

         */
    }

    @Override
    public Mono<Void> deleteLinkAndReorder(Integer linkId, String token) {
        log.info("Inicio del método deleteLinkAndReorder con linkId:{}", linkId);
        String username = jwtProvider.getUsernameFromToken(token);
        return linkRepository.findPositionByLinkIdAndUsername(linkId, username)
                .flatMap(deletedPosition ->
                        linkRepository.deleteById(linkId)
                                .then(linkRepository
                                        .updatePositionAfterDelete(username, deletedPosition)
                                )
                ).then()
                .doOnSuccess(unused -> log.info("Fin del método deleteLinkAndReorder"));
    }
}
