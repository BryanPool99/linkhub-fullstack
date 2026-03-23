package com.bryandev.linkhub.controller.admin;

import com.bryandev.linkhub.model.dto.request.CreateLinkRequestDto;
import com.bryandev.linkhub.model.dto.request.UpdateLinkRequestDto;
import com.bryandev.linkhub.model.dto.response.CreateLinkResponseDto;
import com.bryandev.linkhub.model.dto.response.GenericResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkDto;
import com.bryandev.linkhub.model.dto.response.UpdateLinkResponseDto;
import com.bryandev.linkhub.service.LinkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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
    ) {
        log.info("TOKEN ES:{}", token);
        String jwt = token.substring(7);
        log.info("el jwt es:{}", jwt);
        return linkService.getAllLinksByToken(jwt);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<GenericResponseDto<CreateLinkResponseDto>> createLinkByUsername(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateLinkRequestDto requestDto
    ) {
        String jwt = token.substring(7);
        return linkService.createLinkByUsername(jwt, requestDto);
    }

    @DeleteMapping("/{linkId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteLinkByLinkId(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer linkId
    ) {
        String token = authorizationHeader.substring(7);
        return linkService.deleteLinkAndReorder(linkId, token);
    }

    @PatchMapping("/{linkId}")
    public Mono<GenericResponseDto<UpdateLinkResponseDto>> updateLinkByLinkIdAndUsername(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer linkId, @RequestBody UpdateLinkRequestDto updateRequest
    ) {
        String token = authorizationHeader.substring(7);
        return linkService.updateLinkByIdAndUsername(token,linkId,updateRequest);
    }
}
