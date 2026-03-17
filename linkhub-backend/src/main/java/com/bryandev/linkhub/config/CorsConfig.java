package com.bryandev.linkhub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
public class CorsConfig implements WebFluxConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // URL exacta de Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // OPTIONS es clave
                .allowedHeaders("*") // Permite Authorization, Content-Type, etc.
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600); // Cachear la respuesta de CORS por 1 hora
    }
}
