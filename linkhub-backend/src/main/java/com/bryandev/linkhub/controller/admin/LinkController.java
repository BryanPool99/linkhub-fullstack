package com.bryandev.linkhub.controller.admin;

import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkDto;
import com.bryandev.linkhub.service.LinkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/admin/link")
@RequiredArgsConstructor
@Slf4j
public class LinkController {

    private final LinkService linkService;

    @GetMapping("/findAll")
    public Mono<GenericResponseDto<List<LinkDto>>> getLinksByUsername(
            @RequestHeader("Authorization") String token
    ){
        log.info("TOKEN ES:{}",token);
        String jwt = token.substring(7);
        log.info("el jwt es:{}",jwt);
        return linkService.getAllLinksByToken(jwt);
    }
}
