import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys } from '../constants/cookie-keys';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // private readonly cookieService = inject(CookieService);

  get isAdmin() {
    return JSON.parse(localStorage.getItem(CookieKeys.USER)??'').isAdmin ?? false;
  }
}
