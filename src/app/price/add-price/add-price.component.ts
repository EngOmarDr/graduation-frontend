import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from "../../../components/custom-field.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-price',
  imports: [ReactiveFormsModule, CustomFieldComponent,CommonModule],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.css',
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
