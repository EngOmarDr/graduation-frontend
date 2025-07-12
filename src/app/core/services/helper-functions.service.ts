import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../constants/storage-keys';
import { LoginResponse } from 'app/modules/login/models/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class HelperFunctionsService {
  addOneToString(s: string): string {
    let len: number = s.length;
    let hs: string = '';

    while (len > 0 && s[len - 1] === '9') {
      hs = s[len - 1] + hs;
      s = s.substring(0, len - 1);
      len = s.length;
    }

    if (
      len > 0 &&
      parseInt(s[len - 1], 10) >= 0 &&
      parseInt(s[len - 1], 10) <= 8
    ) {
      hs = s[len - 1] + hs;
      s = s.substring(0, len - 1);
    }

    if (hs === '') {
      return s + '001';
    } else {
      return s + (Number.parseInt(hs) + 1).toString();
    }
  }
}
