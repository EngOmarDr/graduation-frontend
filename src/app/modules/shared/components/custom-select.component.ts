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
  selector: 'cust-select',
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
        *ngIf="showLabel()"
        [ngClass]="{
          'cust-label-disable': control().disabled
        }"
        >{{ label() }}</label
      >
      <select [id]="inputId()" [formControl]="formControl" class="cust-input">
        @for(option of options(); track $index){
        <option [value]="option.key ?? option.id">
          {{ option.value ?? option.name }}
        </option>
        }
      </select>
      <app-validation-message
        [control]="control()"
        [customMessage]="customMessage()"
        [name]="label()"
      />
    </div>
  `,
})
export class CustomSelectComponent {
  readonly label = input.required<string>();
  readonly inputId = input.required<string>();
  readonly control = input.required<AbstractControl>();
  readonly options = input.required<any[]>();
  readonly showLabel = input<boolean>(true);
  readonly customMessage = input<string | null>(null);

  get formControl(): FormControl {
    return this.control() as FormControl;
  }
}
