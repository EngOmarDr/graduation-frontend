import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { AdvertisementService } from '../../services/Advertisement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-advertisement-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent,
  ],
  templateUrl: './add-advertisement-component.component.html',
  styleUrl: './add-advertisement-component.component.css',
})
export class AddAdvertisementComponentComponent {
  private service = inject(AdvertisementService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  file: File | null = null;

  form = this.fb.group({
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

onSubmit() {
  if (this.form.valid && this.file) {
    const title = this.form.value.title ?? '';
    const duration = Number(this.form.value.duration);
    const type = this.form.value.type ?? '';

    if (!title || !duration || !type) {
      alert('Please fill all required fields correctly.');
      return;
    }

    this.service.create({ name: title, duration, type }, this.file).subscribe({
      next: (res) => {
        console.log('Advertisement added:', res);
        this.form.reset({ type: 'image' });
        this.file = null;
        
        this.router.navigate(['/price-display']);
      },
      error: (err) => {
        console.error('Error adding advertisement:', err);
        alert('Failed to add advertisement. Please try again.');
      },
    });
  } else {
    this.form.markAllAsTouched();
    alert('Please fill all required fields and select a media file.');
  }
}
}
