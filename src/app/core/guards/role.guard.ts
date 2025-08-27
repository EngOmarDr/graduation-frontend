import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const storageService = inject(StorageService);
    const router = inject(Router);

    const role = storageService.role;

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  };
}
