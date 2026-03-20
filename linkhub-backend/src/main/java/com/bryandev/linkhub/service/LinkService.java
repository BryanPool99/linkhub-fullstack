package com.bryandev.linkhub.service;

import com.bryandev.linkhub.model.dto.request.CreateLinkRequestDto;
import com.bryandev.linkhub.model.dto.response.CreateLinkResponseDto;
import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkDto;
import reactor.core.publisher.Mono;

import java.util.List;

public interface LinkService {
    Mono<GenericResponseDto<List<LinkDto>>> getAllLinksByToken(String token);

    Mono<GenericResponseDto<CreateLinkResponseDto>> createLinkByUsername(
            String token, CreateLinkRequestDto requestDto);

    Mono<Void> deleteLinkAndReorder(Integer linkId,String token);
}
