package com.bryandev.linkhub.service.impl;

import com.bryandev.linkhub.mapper.LinkMapper;
import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.PublicProfileDto;
import com.bryandev.linkhub.repository.LinkRepository;
import com.bryandev.linkhub.repository.UserRepository;
import com.bryandev.linkhub.service.PublicService;
import com.bryandev.linkhub.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j

public class PublicServiceImpl implements PublicService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;

    private final LinkMapper linkMapper;

    @Override
    public Mono<GenericResponseDto<PublicProfileDto>> getInfoProfileByUsername(String username) {
        log.info("Inicio del método getInfoProfileByUsername: {}", username);

        return userRepository.findByUsername(username)
                .flatMap(userEntity ->
                        linkRepository.findByUserIdAndIsActiveTrue(userEntity.getId())
                                .collectList()
                                .map(linkEntities -> {
                                    String[] bioParts = userEntity.getBio()!=null ? userEntity.getBio().split(" \\| "):new String[]{"", ""};
                                    String title = bioParts.length > 0 ? bioParts[0]:"";
                                    String bio = bioParts.length > 1 ? bioParts[1]:"";

                                    return PublicProfileDto.builder()
                                            .urlImg(userEntity.getProfilePictureUrl())
                                            .username(userEntity.getUsername())
                                            .title(title)
                                            .bio(bio)
                                            .themeColor(userEntity.getThemeColor())
                                            .links(linkMapper.ListLinkPublicDtoToListLinkEntity(linkEntities))
                                            .build();
                                })
                )
                .map(ApiResponse::success)
                .switchIfEmpty(Mono.error(new RuntimeException("Usuario no encontrado")))
                .doOnError(throwable ->
                        log.error("Hubo un error en el método getInfoProfileByUsername : {}", throwable.getMessage()))
                .doOnSuccess(v ->
                        log.info("Culmino el llamado a este metodogetInfoProfileByUsername "));
    }
}
