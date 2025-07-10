import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appNumberFormat]',
})
export class NumberFormatDirective implements OnInit {
  private readonly formControl = inject(NgControl);
  private readonly elementRef = inject(ElementRef);
  private el: HTMLInputElement = this.elementRef.nativeElement;

  @Input() appNumberFormat: number = 2;

  ngOnInit() {}

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    if (value == '0') {
      return;
    }
    this.updateValue(value);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow specific keys (backspace, delete, tab, escape, enter, etc.)
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Control',
      'Meta',
      'Shift',
      'Home',
      'End',
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    // Only allow numbers, decimal point, and comma
    if (
      (event.key < '0' || event.key > '9') &&
      event.key !== '.' &&
      event.key !== ','
    ) {
      event.preventDefault();
    }
  }

  private updateValue(value: string) {
    // Parse the number and format it
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
      return;
    }
    const formattedValue = numberValue.toFixed(this.appNumberFormat);

    // Update the form control value
    this.formControl.control?.setValue(formattedValue);
    this.el.value = formattedValue; // Update the input element's value
  }
}
