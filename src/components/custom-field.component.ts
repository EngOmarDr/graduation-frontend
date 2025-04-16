import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationMessageComponent } from './validation-message.component';

@Component({
  selector: 'cust-form-field',
  imports: [CommonModule, ValidationMessageComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div>
      <label
        [for]="inputId"
        class="cust-input-label"
        [ngClass]="{
          'cust-label-disable': control.disabled
        }"
        >{{ label }}
      </label>
      <input
        [id]="inputId"
        [formControl]="formControl"
        type="{{ type }}"
        class="cust-input"
      />
      <app-validation-message
        [control]="control"
        [customMessage]="null"
        name="{{label}}"
      />
    </div>
  `,
})
export class CustomFieldComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) inputId!: string;
  @Input({ required: true }) control!: AbstractControl;
  @Input() type: string = 'text';
  @Input() customMessage: string | null = null;
  get formControl(): FormControl {
    return this.control as FormControl;
  }
}
