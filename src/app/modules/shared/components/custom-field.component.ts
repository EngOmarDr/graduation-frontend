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
import { NumberFormatDirective } from 'app/core/directives/number-format.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cust-form-field',
  imports: [
    CommonModule,
    ValidationMessageComponent,
    ReactiveFormsModule,
    NumberFormatDirective,
  ],
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
  *ngIf="label()"
  [ngClass]="{ 'cust-label-disable': control().disabled }"
>
  {{ label() }}
  <span *ngIf="required()" class="text-red-600">*</span>
</label>
      @if(type()=='number'){

      <input
        [id]="inputId()"
        [formControl]="formControl"
        (click)="selectAllText($event)"
        type="{{ type() }}"
        class="cust-input"
        [appNumberFormat]="numberFormat()"
        [readOnly]="readOnly()"
      />
      }@else {
      <input
        [id]="inputId()"
        [formControl]="formControl"
        (click)="selectAllText($event)"
        type="{{ type() }}"
        class="cust-input"
        [readOnly]="readOnly()"
      />
      }
      <app-validation-message
        [control]="control()"
        [customMessage]="customMessage()"
        name="{{ label() ?? inputId() }}"
      />
    </div>
  `,
})
export class CustomFieldComponent {
  readonly label = input<string>();
  readonly inputId = input.required<string>();
  readonly control = input.required<AbstractControl>();
  readonly numberFormat = input<number>(2);
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
  readonly required = input<boolean>(false);
  readonly customMessage = input<string | null>(null);
  get formControl(): FormControl {
    return this.control() as FormControl;
  }

  selectAllText(event: MouseEvent) {
    if (this.type() == 'number') {
      const input = event.target as HTMLInputElement;
      input.select();
    }
  }
}
