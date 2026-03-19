package com.bryandev.linkhub.model.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter  @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenericResponseDto<T> {
    private boolean result;
    private T data;
    private LocalDateTime timestamp;
}
