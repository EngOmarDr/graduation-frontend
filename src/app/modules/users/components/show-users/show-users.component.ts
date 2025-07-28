import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { UserResponse } from '../../models/response/user-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-users',
  imports: [CardComponent, CommonModule, RouterModule,SweetAlert2Module,TranslateModule],
  templateUrl: './show-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowUsersComponent {
  private readonly service = inject(UserService);
  private readonly router = inject(Router);

  usersReadonly = toSignal(this.service.getAllUsers(), { initialValue: [] });
  users = linkedSignal(() => this.usersReadonly());

constructor(){
  effect(() =>console.log(
   this.users()));
}

  deleteItem(object: UserResponse): void {
      this.service.delete(object.id).subscribe(() => {
        this.users.update((old) => old.filter((v) => v.id !== object.id));
      });

  }

  updateItem(object: UserResponse): void {
    this.router.navigate(['/update-user', object.id], {
      state: { object },
    });
  }
}
