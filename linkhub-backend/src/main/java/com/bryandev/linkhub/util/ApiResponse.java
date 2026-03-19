package com.bryandev.linkhub.util;

import com.bryandev.linkhub.model.dto.response.GenericResponseDto;

import java.time.LocalDateTime;

public class ApiResponse {
    // Respuesta exitosa genérica
    public static <T> GenericResponseDto<T> success(T data) {
        return GenericResponseDto.<T>builder()
                .result(true)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    // Respuesta de error (útil para validaciones o fallos)
    public static <T> GenericResponseDto<T> error(T errorDetails) {
        return GenericResponseDto.<T>builder()
                .result(false)
                .data(errorDetails)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
