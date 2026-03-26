package com.bryandev.linkhub.service;

import com.bryandev.linkhub.model.dto.request.CreateLinkRequestDto;
import com.bryandev.linkhub.model.dto.request.UpdateLinkRequestDto;
import com.bryandev.linkhub.model.dto.response.*;
import reactor.core.publisher.Mono;

import java.util.List;

public interface LinkService {
    Mono<GenericResponseDto<List<LinkDto>>> getAllLinksByToken(String token);

    Mono<GenericResponseDto<CreateLinkResponseDto>> createLinkByUsername(
            String token, CreateLinkRequestDto requestDto);

    Mono<Void> deleteLinkAndReorder(Integer linkId, String token);

    Mono<GenericResponseDto<UpdateLinkResponseDto>> updateLinkByIdAndUsername(
            String token, Integer linkId, UpdateLinkRequestDto requestDto
    );

    Mono<GenericResponseDto<PreviewDataDto>> getPreviewDataByUsername(String token);
}
