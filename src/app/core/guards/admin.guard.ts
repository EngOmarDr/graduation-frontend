import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../services/storage.service';

export const adminGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const location = inject(Location);

  if (storageService.role == 'ADMIN') {
    return true;
  } else {
    location.back();
    return false;
  }
};
