import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-add-branch',
  imports: [
    CardComponent,
    CustomFieldComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-branch.component.html',
})
export class AddBranchComponent {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(BranchService);

  form = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    phone: this.fb.control<string>('', [Validators.required]),
    address: this.fb.control<string>(''),
    notes: this.fb.control<string>(''),
  });

  onSubmit() {
    this.service.createBranch(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
      },
    });
  }
}
