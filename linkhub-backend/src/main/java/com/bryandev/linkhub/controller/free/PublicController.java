package com.bryandev.linkhub.controller.free;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/public")
public class PublicController {
    @GetMapping("/saludo")
    public Mono<String> saludo() {
        return Mono.just("Saludo de manera publica");
    }
}
