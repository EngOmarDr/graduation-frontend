// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { ValidationMessageComponent } from './validation-message.component';

// @Component({
//   selector: 'cust-select',
//   imports: [CommonModule, ValidationMessageComponent, ReactiveFormsModule],
//   template: `
//     <div>
//       <label
//         [for]="inputId"
//         class="block text-sm font-medium text-gray-900 dark:text-white"
//         >{{ label }}</label
//       >
//       <select
//         [id]="inputId"
//         [formControl]="control"
//         class="block w-full p-2.5 outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
//       >
//         @for(option of options; track $index){
//         <option [value]="option.key">{{ option.value }}</option>
//         }
//       </select>
//       <app-validation-message
//         [control]="control"
//         [customMessage]="customMessage"
//         [name]="label"
//       />
//     </div>
//   `,
// })
// export class CustomSelectComponent {
//   @Input() label: string = '';
//   @Input() inputId: string = '';
//   @Input() control!: FormControl;
//   @Input() options!: any[];
//   @Input() customMessage: string | null = null;
// }
