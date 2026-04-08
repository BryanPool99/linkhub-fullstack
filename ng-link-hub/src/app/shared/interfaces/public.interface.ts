export interface PublicProfileDto{
    urlImg: string;
    username: string;
    title: string;
    bio: string;
    themeColor: string;
    links: LinkPublicDto[];
}

export interface LinkPublicDto{
    id: number;
    title: string;
    url: string;
    iconType: string;
}