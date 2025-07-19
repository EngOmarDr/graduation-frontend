import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../shared/components/card-form.component';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
import { BranchService } from '../../services/branch.service';
import { BranchResponse } from '../../models/response/branch-response';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-branch',
  imports: [
    CardComponent,
    CustomFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './update-branch.component.html',
})
export class UpdateBranchComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(BranchService);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);

  branch: BranchResponse | undefined;
  branchId: number | undefined;

  form = this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    phone: this.fb.control<string>('', [Validators.required]),
    address: this.fb.control<string>(''),
    notes: this.fb.control<string>(''),
  });

  ngOnInit(): void {
    const navigation = window.history.state;
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id == null) {
      this.location.back();
    } else {
      this.branchId = Number.parseInt(id);
      if (navigation.account) {
        this.form.patchValue(navigation.account);
      } else {
        this.service.getBranchById(this.branchId!).subscribe({
          next: (next) => {
            this.form.patchValue(next);
          },
          error: () => {
            this.location.back();
          },
        });
      }
    }
  }
  onSubmit() {
    this.service
      .updateBranch(this.branchId!, this.form.getRawValue())
      .subscribe({
        next: () => {
          this.location.back();
        },
      });
  }
}
