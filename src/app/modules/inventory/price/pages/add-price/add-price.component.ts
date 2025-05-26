import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CustomFieldComponent } from '@shared/components/custom-field.component';
import { CardComponent } from '@shared/components/card-form.component';
import { PriceService } from '../../services/price.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-price',
  imports: [
    ReactiveFormsModule,
    CustomFieldComponent,
    CommonModule,
    CardComponent,
  ],
  templateUrl: './add-price.component.html',
})
export class AddPriceComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(PriceService);
  private location = inject(Location);
  private activeRoute = inject(ActivatedRoute);

  isUpdate = false;
  priceId = this.activeRoute.snapshot.paramMap.get('id');

  priceForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.priceId) {
      this.isUpdate= true
      const navigation = window.history.state;
      if (navigation.groupData) {
        let price = navigation.price;
        this.priceForm.patchValue(price);
      } else {
        // Fallback: if page refreshed, get ID from route and fetch from API
        if (this.priceId) {
          this.service.getPriceById(this.priceId).subscribe((next) => {
            let group = next;
            this.priceForm.patchValue(group);
          });
        }
      }
    }
  }

  onSubmit() {
    if (this.priceForm.valid) {
      if (this.isUpdate) {
        this.service
          .updatePrice(this.priceId!, this.priceForm.value)
          .subscribe(() => {
            this.location.back();
          });
      } else {
        this.service.createPrice(this.priceForm.value).subscribe(() => {
          this.location.back();
        });
      }
    }
  }
}
