import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../../shared/data-access/base-http.service';
import { Observable, timeout } from 'rxjs';
import { ByPublicIdentifierTagDto } from '../../../../shared/interfaces/dtos/pet/by-public-identifier-tag/by-public-identifier-tag-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class PetsService extends BaseHttpService {

  getByPublicIdentifier(publicIdentifierTag: string): Observable<ByPublicIdentifierTagDto> {

    const url: string = `${this.apiUrl}/pets/by-public-identifier-tag/${publicIdentifierTag}`;
    return this.http
      .get<ByPublicIdentifierTagDto>(url, {})
      .pipe(timeout(this.timeout));
  }

}
