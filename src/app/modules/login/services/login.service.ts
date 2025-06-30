import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../../../core/constants/storage-keys';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  login(
    data: Partial<{ username: string; password: string }>
  ): Observable<any> {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/auth/login`, data)
      .pipe(
        tap((response) => {
          this.cookieService.set(StorageKeys.TOKEN, response.token);
        })
      );
  }
}
