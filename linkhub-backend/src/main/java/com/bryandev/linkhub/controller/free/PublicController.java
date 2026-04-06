package com.bryandev.linkhub.controller.free;

import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.PublicProfileDto;
import com.bryandev.linkhub.service.PublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {

    private final PublicService publicService;

    @GetMapping("/saludo")
    public Mono<String> saludo() {
        return Mono.just("Saludo de manera publica");
    }

    @GetMapping("/profile/{username}")
    public Mono<GenericResponseDto<PublicProfileDto>> getProfilePublicByUsername(@PathVariable String username){
        return publicService.getInfoProfileByUsername(username);
    }
}
