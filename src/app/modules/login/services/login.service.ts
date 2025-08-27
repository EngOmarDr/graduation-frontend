import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../../../core/constants/storage-keys';
import { environment } from 'environments/environment';
import { LoginResponse } from '../models/response/login-response';
import { StorageService } from 'app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  login(data: { username: string; password: string; rememberMe: boolean }) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
      .pipe(
        tap((response) => {
          console.log('Login response:', response);
          this.storageService.clearStorage();
          if (data.rememberMe) {
            this.storageService.storageInLocal(response);
          } else {
            this.storageService.storageInCookie(response);
          }
        })
      );
  }
}
