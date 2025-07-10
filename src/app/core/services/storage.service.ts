import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../constants/storage-keys';
import { LoginResponse } from 'app/modules/login/models/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly cookieService = inject(CookieService);
  private localUser = localStorage.getItem(StorageKeys.USER);
  private cookieUser = this.cookieService.get(StorageKeys.USER);
  private user?: LoginResponse =
    this.localUser || this.cookieUser
      ? JSON.parse(this.localUser ?? this.cookieUser)
      : undefined;

  storageInLocal(data: LoginResponse) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data));
    this.user = data;
  }

  storageInCookie(data: LoginResponse) {
    this.cookieService.set(StorageKeys.USER, JSON.stringify(data), {
      sameSite: 'Strict',
    });
    this.user = data;
  }

  clearStorage() {
    localStorage.removeItem(StorageKeys.USER);
    this.cookieService.delete(StorageKeys.USER);
    this.user = undefined;
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
  get warehouseId() {
    return this.user?.warehouseId;
  }
}
