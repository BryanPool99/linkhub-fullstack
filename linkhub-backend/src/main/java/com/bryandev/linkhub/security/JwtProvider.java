package com.bryandev.linkhub.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtProvider {
    @Value("${spring.application.security.secret-key}")
    private String secretKey;
    @Value("${spring.application.security.expiration}")
    private long expiration;

    //Generación de la Llave de Firma
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    //generar token
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())//Guarda el nombre de usuario
                .setIssuedAt(new Date())//Registra la fecha y hora exacta en que se creó.
                .setExpiration(new Date(System.currentTimeMillis() + expiration))//uma el tiempo de expiración a la hora actual. Si se pasa de este tiempo, el token dejará de funcionar automáticamente.
                .signWith(getSigningKey())//Firma el token con la llave que generamos antes.
                .compact();
    }

    //Extracción de Información
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    //VALIDAR EL TOKEN
    public boolean validateToken(String token) {
        log.info("Inicio del metodo de validacion del token");
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            log.info("EL TOKEN SE VALIDO CORRECTAMENTE");
            return true;
        } catch (Exception e) {
            log.info("El token no es valido debido a {}",e.getMessage());
            return false;
        }
    }
}
