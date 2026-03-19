package com.bryandev.linkhub.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter implements WebFilter {

    private final JwtAuthenticationManager jwtAuthenticationManager;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // Creamos el objeto de autenticación temporal
            Authentication auth = new UsernamePasswordAuthenticationToken(token, token);

            return jwtAuthenticationManager.authenticate(auth)
                    .flatMap(authentication ->
                            // Si el token es válido, inyectamos la seguridad y seguimos
                            chain.filter(exchange)
                                    .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication))
                    )
                    .onErrorResume(e -> {
                        // 🚨 CAMBIO CLAVE: En lugar de 401, logueamos el error y dejamos pasar
                        // Spring Security se encargará después si la ruta requiere ADMIN
                        log.error("Fallo en autenticación JWT: {}", e.getMessage());
                        return chain.filter(exchange);
                    });
        }

        return chain.filter(exchange);
    }
}
