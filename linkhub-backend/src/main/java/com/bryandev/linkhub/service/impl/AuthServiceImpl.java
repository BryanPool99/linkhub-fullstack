package com.bryandev.linkhub.service.impl;

import com.bryandev.linkhub.model.dto.request.UserRegisterRequestDto;
import com.bryandev.linkhub.model.dto.response.TokenResponseDto;
import com.bryandev.linkhub.model.entitIes.UserEntity;
import com.bryandev.linkhub.repository.UserRepository;
import com.bryandev.linkhub.security.JwtProvider;
import com.bryandev.linkhub.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final TransactionalOperator transactionalOperator;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Override
    public Mono<TokenResponseDto> registerUser(UserRegisterRequestDto registerRequestDto) {
        log.info("Inicio del método registerUser");
        var newUser = UserEntity.builder()
                .username(registerRequestDto.getUsername())
                .email(registerRequestDto.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequestDto.getPassword()))
                .roles(registerRequestDto.getRoles())
                .build();
        return userRepository.save(newUser)
                .map(userEntity -> TokenResponseDto.builder()
                        .accessToken(jwtProvider.generateToken(userEntity))
                        .build())
                .as(transactionalOperator::transactional);
    }
}
