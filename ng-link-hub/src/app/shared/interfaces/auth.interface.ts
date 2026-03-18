export interface AuthRequestDto{
    username: string,
    password: string
}

export interface UserRegisterRequestDto{
    username: string,
    email: string,
    password: string,
    roles : string
}

export interface TokenResponseDto{
    accessToken: string
}