package com.bryandev.linkhub.service;

import com.bryandev.linkhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsService implements ReactiveUserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        log.info("Inicio de metodo findByUsername con username:{}", username);
        return userRepository.findByUsername(username)
                .doOnNext(userEntity -> log.info("USER ES:{}", userEntity.getEmail()))
                .map(userEntity -> {
                    log.info("Password en BD: {}", userEntity.getPasswordHash());
                    boolean coincide = passwordEncoder.matches("12345", userEntity.getPasswordHash());
                    log.info("¿La clave 12345 coincide con la BD?: {}", coincide);

                    return User.withUsername(userEntity.getUsername())
                            .password(userEntity.getPasswordHash())
                            .authorities(userEntity.getRoles().split(","))//POR DEFECTO YA INCLUTE EL PREFIJO ROLE_
                            //.roles()//SI SE USA ROLES ACA SI DEBERIAMOS COLCOAR COMPLETO EL ROLE_ADMIN O ROLE_USER
                            .build();
                })
                .switchIfEmpty(Mono.defer(() -> {
                    log.error("¡Usuario no encontrado en la base de datos!");
                    return Mono.error(new UsernameNotFoundException("No existe"));
                }));
    }
}
