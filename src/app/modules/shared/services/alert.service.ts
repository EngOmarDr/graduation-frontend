import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private translate: TranslateService) {}

  showSuccess(type: 'added' | 'updated' | 'deleted') {
    this.translate.get(`messages.${type}`).subscribe((msg) => {
      Swal.fire({
        icon: 'success',
        title: msg,
        toast: true,
        timer: 2500,
        position: 'top-end',
        showConfirmButton: false,
      });
    });
  }

  confirmDelete(itemName: string, confirmCallback: () => void) {
    this.translate.get(['common.delete', 'productS.delete_confirm', 'common.cancel']).subscribe(([title, text, cancel]) => {
      Swal.fire({
        title,
        text: `${text} ${itemName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: title,
        cancelButtonText: cancel || 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          confirmCallback();
        }
      });
    });
  }

  showWarning(messageKey: string) {
  this.translate.get(messageKey).subscribe((msg) => {
    Swal.fire({
      icon: 'warning',
      title: msg,
      toast: true,
      timer: 2500,
      position: 'top-end',
      showConfirmButton: false,
    });
  });
}

showError(messageKey: string) {
  this.translate.get(messageKey).subscribe((msg) => {
    Swal.fire({
      icon: 'error',
      title: msg,
      toast: true,
      timer: 2500,
      position: 'top-end',
      showConfirmButton: false,
    });
  });
}
}
