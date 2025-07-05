import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../../../core/constants/storage-keys';
import { environment } from 'environments/environment';
import { LoginResponse } from '../models/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  login(data: Partial<{ username: string; password: string }>) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
      .pipe(
        tap((response) => {
          console.log(response);
          localStorage.setItem(StorageKeys.USER, JSON.stringify(response));
          this.cookieService.set(StorageKeys.USER, JSON.stringify(response), {
            sameSite: 'Strict',
          });
        })
      );
  }
}
