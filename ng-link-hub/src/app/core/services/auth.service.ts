import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthRequestDto, TokenResponseDto, UserRegisterRequestDto } from '../../shared/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //SE OBTIENE LA RUTA BASE DEL BACKEND
  private apiUrlAuthBase = 'http://localhost:8080/auth';
  //INJECTANDO EL CLIENTE HTTP
  _httpClient = inject(HttpClient);

  login(authRequest:AuthRequestDto):Observable<TokenResponseDto>{
    return this._httpClient.post<TokenResponseDto>(`${this.apiUrlAuthBase}/login`, authRequest);
  }

  registerUser( registerRequest:UserRegisterRequestDto):Observable<TokenResponseDto>{
    return this._httpClient.post<TokenResponseDto>(`${this.apiUrlAuthBase}/register`, registerRequest);
  }
}
