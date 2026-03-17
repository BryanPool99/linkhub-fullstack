import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrlAdminBase = 'http://localhost:8080/admin';
  //INJECTANDO EL CLIENTE HTTP
  _httpClient = inject(HttpClient);

  saludoDesdeElAdmin():Observable<string> {
    return this._httpClient.get<string>(`${this.apiUrlAdminBase}/saludo`);
  }
}
