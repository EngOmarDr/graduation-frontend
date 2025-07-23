import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@shared/components/card-form.component';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { ValidationMessageComponent } from '@shared/components/validation-message.component';
import { AdvertisementService } from '../../services/Advertisement.service';
import { AdvertisementResponse } from '../../models/advertisement-response';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-advertisement-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    TranslateModule
  ],
  templateUrl: './update-advertisement-component.component.html',
  styleUrl: './update-advertisement-component.component.css'
})
export class UpdateAdvertisementComponentComponent implements OnInit {
 private service = inject(AdvertisementService);
  private loc = inject(Location);
  private route = inject(ActivatedRoute);
  file: File | null = null;
  ad!: AdvertisementResponse;

  form = inject(FormBuilder).group({
    title: ['', Validators.required],
    type: ['image', Validators.required],
    media: [null],
    duration: [null as number | null, [Validators.required, Validators.min(1)]],
  });

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (!id) {
    alert('Invalid Advertisement ID');
    return;
  }

  this.service.getById(id).subscribe({
    next: (ad) => {
      this.ad = {
        ...ad,
        type: ad.mediaUrl.endsWith('.mp4') ? 'video' : 'image',
      };

      this.form.patchValue({
        title: this.ad.name,
        type: this.ad.type,
        duration: this.ad.duration,
      });
    },
    error: (err) => {
      console.error('Failed to load ad:', err);
      alert('Failed to load advertisement');
    }
  });
}


  upload(event: any) {
    const f = event.target.files?.[0];
    this.file = f || null;
  }

onSubmit() {
  if (this.form.valid) {
    const title = this.form.value.title ?? '';
    const duration = Number(this.form.value.duration);
    const type = this.form.value.type ?? '';

    if (!title || !duration || !type) {
      alert('Please fill all fields correctly.');
      return;
    }

    this.service.update(this.ad.id, { name: title, duration, type }, this.file ?? undefined).subscribe({
      next: () => {
        alert('Advertisement updated successfully!');
        this.loc.back();
      },
      error: (err) => {
        console.error('Error updating advertisement:', err);
        alert('Failed to update advertisement. Please try again.');
      },
    });
  } else {
    this.form.markAllAsTouched();
    alert('Please correct the validation errors before submitting.');
  }
}

}
