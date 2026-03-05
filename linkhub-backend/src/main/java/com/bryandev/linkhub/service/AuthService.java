package com.bryandev.linkhub.service;

import com.bryandev.linkhub.model.dto.request.UserRegisterRequestDto;
import com.bryandev.linkhub.model.dto.response.TokenResponseDto;
import reactor.core.publisher.Mono;

public interface AuthService {
    Mono<TokenResponseDto> registerUser(UserRegisterRequestDto registerRequestDto);
}
