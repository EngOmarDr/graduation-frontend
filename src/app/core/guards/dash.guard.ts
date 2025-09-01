import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Roles } from '../constants/roles.enum';

export const dashGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const location = inject(Location);
  if (storageService.role == Roles.MANAGER || storageService.role == Roles.ADMIN) {
    return true;
  } else {
    location.back();
    return false;
  }
};
