import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageKeys } from '../constants/storage-keys';

export const authGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const token = cookieService.get(StorageKeys.USER);

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
