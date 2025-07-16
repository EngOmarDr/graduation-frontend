import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { AdvertisementService } from '../../services/Advertisement.service';

@Component({
  selector: 'app-add-advertisement-component',
  imports: [ ReactiveFormsModule, CommonModule, NgOptimizedImage,
    CardComponent, CustomFieldComponent, ValidationMessageComponent],
  templateUrl: './add-advertisement-component.component.html',
  styleUrl: './add-advertisement-component.component.css'
})
export class AddAdvertisementComponentComponent {
 private service = inject(AdvertisementService);
  file: File | null = null;

  form = inject(FormBuilder).group({
    title: ['', Validators.required],
    type: ['image', Validators.required],
    media: [null, Validators.required],
    duration: [null, [Validators.required, Validators.min(1)]],
  });

  upload(event: any) {
    const f = event.target.files?.[0];
    this.file = f || null;
    this.form.patchValue({ media: f });
  }

  // onSubmit() {
  //   if (this.form.valid && this.file) {
  //     this.service.create(this.form.value, this.file).subscribe(() =>
  //       this.form.reset({ type: 'image' /* reset type */ })
  //     );
  //   } else {
  //     this.form.markAllAsTouched();
  //   }
  // }
}
