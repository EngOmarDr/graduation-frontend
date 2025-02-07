// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { ValidationMessageComponent } from './validation-message.component';
// import { CustomInputComponent } from './custom-input.component';

// @Component({
//   selector: 'cust-form-field',
//   imports: [
//     CommonModule,
//     ValidationMessageComponent,
//     ReactiveFormsModule,
//     CustomInputComponent,
//   ],
//   template: `
//     <div>
//       <label
//         [for]="inputId"
//         class="block text-sm font-medium text-gray-900 dark:text-white"
//         >{{ label }}</label
//       >
//       <cust-input [id]="inputId" [formControl]="control" [type]="type" />
//       <app-validation-message
//         [control]="control"
//         [customMessage]="customMessage"
//         [name]="label"
//       />
//     </div>
//   `,
// })
// export class CustomFieldComponent {
//   @Input() label: string = '';
//   @Input() inputId: string = '';
//   @Input() control!: FormControl;
//   @Input() type: string = 'text';
//   @Input() customMessage: string | null = null;
// }
