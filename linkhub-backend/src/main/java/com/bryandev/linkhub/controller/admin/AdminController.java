package com.bryandev.linkhub.controller.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/saludo")
    public Mono<String> saludoAdmin() {
        return Mono.just("HOLA DESDE EL ADMIN");
    }
}
