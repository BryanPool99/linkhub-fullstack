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
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // OPTIONS es clave
                .allowedHeaders("*") // Permite Authorization, Content-Type, etc.
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600); // Cachear la respuesta de CORS por 1 hora
    }
    /*
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ Orígenes permitidos
        config.setAllowedOrigins(List.of("http://localhost:4200"));

        // ✅ Métodos permitidos (¡PATCH es clave!)
        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));

        // ✅ Headers permitidos
        config.setAllowedHeaders(List.of("*"));

        // ✅ Headers expuestos para que el frontend los pueda leer
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));

        // ✅ Credenciales (cookies, auth headers)
        config.setAllowCredentials(true);

        // ✅ Cache del preflight por 1 hora
        config.setMaxAge(3600L);

        // ✅ Aplicar a todas las rutas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }

     */
}
