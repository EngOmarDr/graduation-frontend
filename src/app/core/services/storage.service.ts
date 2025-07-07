import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../constants/storage-keys';
import { LoginResponse } from 'app/modules/login/models/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly cookieService = inject(CookieService);
  user = JSON.parse(
    localStorage.getItem(StorageKeys.USER) ??
      this.cookieService.get(StorageKeys.USER)
  ) as LoginResponse | undefined;

  storageInLocal(data: LoginResponse) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data));
  }

  storageInCookie(data: LoginResponse) {
    this.cookieService.set(StorageKeys.USER, JSON.stringify(data), {
      sameSite: 'Strict',
    });
  }

  get isAdmin() {
    return this.user?.role == 'ADMIN';
  }
  get role() {
    return this.user?.role;
  }
  get token() {
    return this.user?.token;
  }
}
