import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';
import { CardComponent } from '../../../shared/components/card-form.component';
import { GroupService } from '../services/group.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Group } from '../models/group';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-add-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomFieldComponent,
    ValidationMessageComponent,
    CardComponent,
    NgSelectModule,
    AsyncPipe,
    TranslateModule
  ],
  templateUrl: './add-group.component.html',
})
export class AddGroupComponent {
  constructor(private alert: AlertService) {}
  private fb = inject(NonNullableFormBuilder);
  private service = inject(GroupService);
  private router = inject(Router);

  results = [];

  form = this.fb.group({
    code: this.fb.control(window.history.state.code, {
      validators: [Validators.required],
    }),
    name: ['', [Validators.required]],
    parentId: [undefined, { validators: [], disabled: true }],
    notes: [''],
  });

  groups$: Observable<Group[]> = of();

  ngOnInit(): void {
    this.groups$ = this.service.getGroups();
  }

  searchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term)
    );
  }
  onSubmit() {
    if (this.form.valid) {
      this.service.createGroup(this.form.getRawValue()).subscribe({
        next: (res) => {
          console.log('Currency created:', res);
          this.alert.showSuccess('added');
          this.router.navigate(['/groups']);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
