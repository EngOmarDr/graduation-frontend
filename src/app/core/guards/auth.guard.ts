import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys } from '../constants/cookie-keys';

export const authGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const token = cookieService.get(CookieKeys.TOKEN);

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
