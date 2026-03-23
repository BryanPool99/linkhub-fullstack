package com.bryandev.linkhub.util.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PlatformIconEnum {
    YOUTUBE("youtube", "ionLogoYoutube"),
    FACEBOOK("facebook", "ionLogoFacebook"),
    INSTAGRAM("instagram", "ionLogoInstagram"),
    LINKEDIN("linkedin", "ionLogoLinkedin"),
    TIKTOK("tiktok", "ionLogoTiktok"),
    BITBUCKET("bitbucket", "ionLogoBitbucket"),
    DISCORD("discord", "ionLogoDiscord"),
    CODEPEN("codepen", "ionLogoCodepen"),
    GITHUB("github", "ionLogoGithub"),
    GITLAB("gitlab", "ionLogoGitlab"),
    TWITCH("twitch", "ionLogoTwitch"),
    DEFAULT("default_icon", "ionLinkSharp");
    private final String code;
    private final String iconClass;
}
