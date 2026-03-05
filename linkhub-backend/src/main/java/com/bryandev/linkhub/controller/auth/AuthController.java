package com.bryandev.linkhub.controller.auth;

import com.bryandev.linkhub.model.dto.request.AuthRequestDto;
import com.bryandev.linkhub.model.dto.request.UserRegisterRequestDto;
import com.bryandev.linkhub.model.dto.response.TokenResponseDto;
import com.bryandev.linkhub.security.JwtProvider;
import com.bryandev.linkhub.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ReactiveAuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    private final AuthService authService;

    @PostMapping("/login")
    public Mono<ResponseEntity<TokenResponseDto>> login(@RequestBody AuthRequestDto authRequestDto) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        authRequestDto.getUsername(), authRequestDto.getPassword()
                ))
                .map(authentication ->
                        ResponseEntity.ok(TokenResponseDto.builder()
                                .accessToken(jwtProvider.generateToken((UserDetails) authentication.getPrincipal()))
                                .build()))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()));

    }

    @PostMapping("/register")
    public Mono<ResponseEntity<TokenResponseDto>> registerUser(
            @RequestBody UserRegisterRequestDto userRegisterRequestDto
    ) {
        return authService.registerUser(userRegisterRequestDto)
                .map(tokenResponseDto ->
                        ResponseEntity.status(HttpStatus.CREATED).body(tokenResponseDto));
    }
}
