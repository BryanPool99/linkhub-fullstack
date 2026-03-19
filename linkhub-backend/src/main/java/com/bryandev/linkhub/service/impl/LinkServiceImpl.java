package com.bryandev.linkhub.service.impl;

import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkDto;
import com.bryandev.linkhub.repository.LinkRepository;
import com.bryandev.linkhub.security.JwtProvider;
import com.bryandev.linkhub.service.LinkService;
import com.bryandev.linkhub.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service//para el contexto de spring
@RequiredArgsConstructor//para ahcer inyeccion de dependencia por constructor
@Slf4j//para los logs
public class LinkServiceImpl implements LinkService {

    private final LinkRepository linkRepository;
    private final JwtProvider jwtProvider;

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
}
