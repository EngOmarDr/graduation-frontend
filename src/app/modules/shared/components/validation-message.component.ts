import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  imports: [FormsModule, CommonModule],
  template: `
    @if(control.invalid && (control.touched || control.dirty)){
    @if(control.errors?.['required']){
    <small class="validation-text">
      {{ name + ' is required' }}
    </small>
    }@else if(control.errors?.['email']){
    <small class="validation-text">
      {{ 'should be a valid email' }}
    </small>
    }@else if(customMessage){
    <small class="validation-text">
      {{ customMessage }}
    </small>
    } }
  `,
})
export class ValidationMessageComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input({ required: true }) name!: string;
  @Input() customMessage: string | null = null;
}
