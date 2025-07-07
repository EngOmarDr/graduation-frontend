import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.token;

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
