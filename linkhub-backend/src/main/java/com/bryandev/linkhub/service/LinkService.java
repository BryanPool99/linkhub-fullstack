package com.bryandev.linkhub.service;

import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkDto;
import reactor.core.publisher.Mono;

import java.util.List;

public interface LinkService {
    Mono<GenericResponseDto<List<LinkDto>>> getAllLinksByToken(String token);
}
