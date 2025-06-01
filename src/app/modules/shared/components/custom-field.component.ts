import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
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
        [for]="inputId()"
        class="cust-input-label"
        [ngClass]="{
          'cust-label-disable': control().disabled
        }"
        >{{ label() }}
      </label>
      <input
        [id]="inputId()"
        [formControl]="formControl"
        type="{{ type() }}"
        class="cust-input"
        [readOnly]="readOnly()"
      />
      <app-validation-message
        [control]="control()"
        [customMessage]="customMessage()"
        name="{{ label() }}"
      />
    </div>
  `,
})
export class CustomFieldComponent {
  readonly label = input.required<string>();
  readonly inputId = input.required<string>();
  readonly control = input.required<AbstractControl>();
  readonly type = input<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  >('text');
  readonly readOnly = input<boolean>(false);
  readonly customMessage = input<string | null>(null);
  get formControl(): FormControl {
    return this.control() as FormControl;
  }
}
