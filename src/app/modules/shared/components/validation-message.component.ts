import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-validation-message',
  imports: [FormsModule, CommonModule,TranslateModule],
  template: `
    @if(control.invalid && (control.touched || control.dirty)){
    @if(control.errors?.['required']){
    <small class="validation-text">
      {{ 'validation.required' | translate:{ name: name() } }}
    </small>
    }@else if(control.errors?.['email']){
    <small class="validation-text">
      {{ 'validation.email' | translate }}
    </small>
    }@else if(customMessage){
    <small class="validation-text">
      {{ customMessage }}
    </small>
  }@else {
      <small class="validation-text">
        {{ control.errors }}
      </small>

    } }
  `,
})
export class ValidationMessageComponent {
  @Input({ required: true }) control!: AbstractControl;
  readonly name = input.required<string>();
  @Input() customMessage: string | null = null;
}
