import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponseDto } from '../../../shared/interfaces/apiResponse.interface';
import { LinkDto } from '../../../shared/interfaces/link.interface';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private _httpClient = inject(HttpClient);

  private apiLinkBase = 'http://localhost:8080/admin/link';

  getLinksByUsername(): Observable<GenericResponseDto<LinkDto[]>> {
    return this._httpClient.get<GenericResponseDto<LinkDto[]>>(`${this.apiLinkBase}/findAll`);
  }
}
