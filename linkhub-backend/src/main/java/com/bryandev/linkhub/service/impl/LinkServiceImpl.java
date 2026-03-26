package com.bryandev.linkhub.service.impl;

import com.bryandev.linkhub.mapper.LinkMapper;
import com.bryandev.linkhub.model.dto.request.CreateLinkRequestDto;
import com.bryandev.linkhub.model.dto.request.UpdateLinkRequestDto;
import com.bryandev.linkhub.model.dto.response.*;
import com.bryandev.linkhub.model.entitIes.LinkEntity;
import com.bryandev.linkhub.repository.LinkRepository;
import com.bryandev.linkhub.repository.UserRepository;
import com.bryandev.linkhub.security.JwtProvider;
import com.bryandev.linkhub.service.LinkService;
import com.bryandev.linkhub.util.ApiResponse;
import com.bryandev.linkhub.util.LinkIconResolver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
            String typeIconFromEnum = LinkIconResolver.resolveIcon(requestDto.getUrl());
            log.info("El typeIconFromEnum es: {}", typeIconFromEnum);
            var newLinkEntity = LinkEntity.builder()
                    //.id()//ESTO NO SE COLOCA YA QUE ES AUTOINCREMENTABLE EN LA BD
                    .userId(tuple2.getT2().getId())
                    .title(requestDto.getTitle())
                    .url(requestDto.getUrl())
                    .typeIcon(typeIconFromEnum)
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

    @Override
    public Mono<GenericResponseDto<UpdateLinkResponseDto>> updateLinkByIdAndUsername(
            String token, Integer linkId, UpdateLinkRequestDto requestDto
    ) {
        log.info("Inicio del método updateLinkByIdAndUsername");
        String username = jwtProvider.getUsernameFromToken(token);
        return linkRepository.findLinkByUsernameAndId(username, linkId)
                .flatMap(existingLinkEntity -> updateLinkEntity(existingLinkEntity, requestDto))
                .map(linkEntity ->
                        ApiResponse.success(linkMapper.linkEntityToUpdateLinkResponseDto(linkEntity)))
                .doOnSuccess((user) ->
                        log.info("Fin del método updateLinkByIdAndUsername"));
    }

    private Mono<LinkEntity> updateLinkEntity(LinkEntity existingLinkEntity, UpdateLinkRequestDto requestDto) {
        log.info("Incio de método updateLinkEntity");
        Optional.ofNullable(requestDto.getTitle())
                .ifPresent(existingLinkEntity::setTitle);

        Optional.ofNullable(requestDto.getUrl())
                .ifPresent(urlUdapte -> {
                    existingLinkEntity.setUrl(urlUdapte);
                    existingLinkEntity.setTypeIcon(LinkIconResolver.resolveIcon(urlUdapte));
                });

        Optional.ofNullable(requestDto.getPosition())
                .ifPresent(existingLinkEntity::setPosition);

        Optional.ofNullable(requestDto.getIsActive())
                .ifPresent(existingLinkEntity::setIsActive);

        return linkRepository.save(existingLinkEntity)
                .as(transactionalOperator::transactional)
                .doOnError(throwable ->
                        log.error("Error en método updateLinkEntity {}", throwable.getMessage()))
                .doOnSuccess((user) ->
                        log.info("Fin del método updateLinkEntity"));
    }

    @Override
    public Mono<GenericResponseDto<PreviewDataDto>> getPreviewDataByUsername(String token) {
        log.info("Inicio del método getPreviewDataByUsername");
        String username = jwtProvider.getUsernameFromToken(token);
        return Mono.zip(
                        userRepository.findByUsername(username),
                        linkRepository.findLinksDtoByUsernameAndStateActive(username).collectList()
                ).map(tuple2 -> {
                    var previewDataDtoBuilder = PreviewDataDto
                            .builder()
                            .pictureUrl(tuple2.getT1().getProfilePictureUrl())
                            .username(tuple2.getT1().getUsername())
                            .description(tuple2.getT1().getBio())
                            .links(tuple2.getT2())
                            .build();
                    return ApiResponse.success(previewDataDtoBuilder);
                })
                .doOnError((er) -> log.error("Hubo un error debido a :{}", er.getMessage()))
                .doOnSuccess((v) -> log.info("Informacion lisatda correctamente"));
    }
}
