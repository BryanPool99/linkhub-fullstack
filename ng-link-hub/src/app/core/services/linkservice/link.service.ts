import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponseDto } from '../../../shared/interfaces/apiResponse.interface';
import {
  CreateLinkRequestDto,
  CreateLinkResponseDto,
  LinkDto,
  PreviewDataDto,
  UpdateLinkRequestDto,
  UpdateLinkResponseDto,
} from '../../../shared/interfaces/link.interface';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private _httpClient = inject(HttpClient);

  private apiLinkBase = 'http://localhost:8080/admin/link';

  getLinksByUsername(): Observable<GenericResponseDto<LinkDto[]>> {
    return this._httpClient.get<GenericResponseDto<LinkDto[]>>(`${this.apiLinkBase}/findAll`);
  }

  getPreviewDataByUsername(): Observable<GenericResponseDto<PreviewDataDto>> {
    return this._httpClient.get<GenericResponseDto<PreviewDataDto>>(
      `${this.apiLinkBase}/previewData`,
    );
  }

  deleteLink(linkId: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiLinkBase}/${linkId}`);
  }

  addNewLink(request: CreateLinkRequestDto): Observable<GenericResponseDto<CreateLinkResponseDto>> {
    return this._httpClient.post<GenericResponseDto<CreateLinkResponseDto>>(
      `${this.apiLinkBase}`,
      request,
    );
  }

  updateLink(
    linkId: number,
    updateRequest: UpdateLinkRequestDto,
  ): Observable<GenericResponseDto<UpdateLinkResponseDto>> {
    return this._httpClient.patch<GenericResponseDto<UpdateLinkResponseDto>>(
      `${this.apiLinkBase}/${linkId}`,
      updateRequest,
    );
  }
}
