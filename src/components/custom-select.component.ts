import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
} from '@angular/core';
import {
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
        [for]="inputId"
        class="cust-input-label"
        [ngClass]="{
          'cust-label-disable': control.disabled
        }"
        >{{ label }}</label
      >
      <select [id]="inputId" [formControl]="control" class="cust-input">
        @for(option of options; track $index){
        <option [value]="option.key">{{ option.value }}</option>
        }
      </select>
      <app-validation-message
        [control]="control"
        [customMessage]="customMessage"
        [name]="label"
      />
    </div>
  `,
})
export class CustomSelectComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) inputId!: string;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: any[];
  @Input() customMessage: string | null = null;
}
