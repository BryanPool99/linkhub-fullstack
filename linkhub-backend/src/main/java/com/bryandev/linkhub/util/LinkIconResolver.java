package com.bryandev.linkhub.util;

import com.bryandev.linkhub.util.enums.PlatformIconEnum;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LinkIconResolver {
    public static String resolveIcon(String url) {
        log.info("ENCONTRANDO ICONO MEDIANTE LA URL:{}",url);
        if (url==null || url.isBlank()) {
            return PlatformIconEnum.DEFAULT.getIconClass();
        }
        String lowerUrl = url.toLowerCase();
        //iteracion mediante el for
        for (PlatformIconEnum iconEnum : PlatformIconEnum.values()) {
            if (iconEnum!=PlatformIconEnum.DEFAULT && lowerUrl.contains(iconEnum.getCode())) {
                log.info("EL VALOR RETORNADO ES:{}",iconEnum.getIconClass());
                return iconEnum.getIconClass();
            }
        }
        log.info("EÑ ICONO SERA POR DEFECTO");
        return PlatformIconEnum.DEFAULT.getIconClass();
    }
}
