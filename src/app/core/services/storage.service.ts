import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // private readonly cookieService = inject(CookieService);

  get isAdmin() {
    return JSON.parse(localStorage.getItem(StorageKeys.USER)??'').isAdmin ?? false;
  }
}
