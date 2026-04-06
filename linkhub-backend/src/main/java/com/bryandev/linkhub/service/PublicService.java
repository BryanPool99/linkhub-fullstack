package com.bryandev.linkhub.service;

import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.PublicProfileDto;
import reactor.core.publisher.Mono;

public interface PublicService {
    Mono<GenericResponseDto<PublicProfileDto>> getInfoProfileByUsername(String username);
}
