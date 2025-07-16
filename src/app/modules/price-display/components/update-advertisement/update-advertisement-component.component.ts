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

@Component({
  selector: 'app-update-advertisement-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CustomFieldComponent,
    ValidationMessageComponent],
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
    this.ad = history.state.ad as AdvertisementResponse;
    if (this.ad) {
      this.form.patchValue({
        title: this.ad.title,
        type: this.ad.type,
        duration: this.ad.duration,
      });
    }
  }

  upload(event: any) {
    const f = event.target.files?.[0];
    this.file = f || null;
    this.form.patchValue({ media: f });
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.service.update(this.ad.id, this.form.value, this.file).subscribe(() =>
  //       this.loc.back()
  //     );
  //   } else {
  //     this.form.markAllAsTouched();
  //   }
  // }
}
