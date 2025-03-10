import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from "../../../components/custom-field.component";
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../../components/card-form.component";

@Component({
  selector: 'app-add-price',
  imports: [ReactiveFormsModule, CustomFieldComponent, CommonModule, CardComponent],
  templateUrl: './add-price.component.html',
})
export class AddPriceComponent {
  private fb = inject(NonNullableFormBuilder);

  priceForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  onSubmit() {
    alert(this.priceForm.valid);
  }
}
