import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../constants/storage-keys';
import { Location } from '@angular/common';

export const adminGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const location = inject(Location);
  const token = cookieService.get(StorageKeys.USER);
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER) ?? '') ;
  if (user.role == 'ADMIN') {
    return true;
  } else {
    // location.back()
    return false;
  }
};
