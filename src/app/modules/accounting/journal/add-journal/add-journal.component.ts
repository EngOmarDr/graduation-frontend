// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import {
//   AbstractControl,
//   FormArray,
//   FormControl,
//   FormGroup,
//   FormsModule,
//   NonNullableFormBuilder,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { Currency } from '../../currency/service/currency';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   map,
//   startWith,
//   switchMap,
//   tap,
// } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { CardComponent } from '../../../shared/components/card-form.component';
// import { CustomFieldComponent } from '../../../shared/components/custom-field.component';
// import { CustomSelectComponent } from '../../../shared/components/custom-select.component';
// import { ValidationMessageComponent } from '../../../shared/components/validation-message.component';

// @Component({
//   selector: 'app-journal',
//   imports: [
//     CardComponent,
//     CommonModule,
//     MatTableModule,
//     ReactiveFormsModule,
//     CustomFieldComponent,
//     CustomSelectComponent,
//     ValidationMessageComponent,
//     MatIconModule,
//     FormsModule,
//     MatAutocompleteModule,
//   ],
//   templateUrl: './add-journal.component.html',
// })
// export class AddJournalComponent implements OnInit {
//   private fb = inject(NonNullableFormBuilder);
//   private http = inject(HttpClient);

//   currencies: Currency[] = [];
//   form = this.fb.group({
//     date: [this.getCurrentDate(), [Validators.required]],
//     postDate: [this.getCurrentDate()],
//     currency: ['', [Validators.required]],
//     equality: this.fb.control<number | undefined>(undefined, [
//       Validators.required,
//     ]),
//     notes: [''],
//     items: this.fb.array([], Validators.required),
//   });

//   sumDebit = 0;
//   sumCredit = 0;
//   minus = 0;

//   ngOnInit(): void {
//     this.currencies = [
//       {
//         id: 1,
//         equality: 1.0,
//         name: 'ليرة سورية',
//       },
//       {
//         id: 2,
//         equality: 100000.0,
//         name: 'دولار',
//       },
//     ];
//     this.form.controls.currency.valueChanges.subscribe((value) => {
//       this.form.controls.equality.setValue(
//         this.currencies.find((currnecy) => `${currnecy.id}` == value)?.equality,
//         { emitEvent: false }
//       );
//     });
//     this.form.controls.currency.setValue(this.toOption()[0]?.key.toString());
//   }

//   options = [];

//   filteredOptions: Observable<any> = new Observable();

//   filter(val: string): Observable<any> {
//     return this.searchAccounts().pipe(
//       map((response) =>
//         response.filter((option: any) => {
//           return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0;
//         })
//       )
//     );
//   }
//   accounts: any = [];
//   searchAccounts() {
//     return this.accounts.length
//       ? of(this.accounts)
//       : this.http
//           .get('https://jsonplaceholder.typicode.com/photos')
//           .pipe(tap((data) => (this.accounts = data)));
//   }

//   getCurrentDate(): string {
//     const date = new Date();
//     return date.toISOString().split('T')[0];
//   }

//   onSubmit() {
//     console.log(this.form.value);
//   }

//   displayedColumns: string[] = [
//     '#',
//     'account',
//     'notes',
//     'debit',
//     'credit',
//     'currency',
//     'balance',
//     'equality',
//     'contra account',
//     'actions',
//   ];
//   dataSource = new MatTableDataSource<AbstractControl>([]);

//   get items(): FormArray<FormGroup> {
//     return this.form.get('items') as FormArray<FormGroup>;
//   }

//   createItemRow(): FormGroup {
//     const newRow = this.fb.group({
//       account: ['', Validators.required],
//       notes: [''],
//       debit: ['', [Validators.min(0), Validators.required]],
//       credit: ['', [Validators.min(0), Validators.required]],
//       currency: ['', [Validators.required]],
//       balance: this.fb.control<number>(1, Validators.required),
//       equality: this.fb.control<number>(1, Validators.required),
//       group: ['', [Validators.required]],
//       date: ['', [Validators.required]],
//       contraAccount: ['', [Validators.required]],
//     });
//     this.filteredOptions = newRow.controls.account.valueChanges.pipe(
//       startWith(''),

//       debounceTime(400),

//       distinctUntilChanged(),

//       switchMap((val) => {
//         return this.filter(val || '');
//       })
//     );
//     newRow.controls.currency.valueChanges.subscribe((value) => {
//       newRow.controls.equality.setValue(
//         this.currencies.find((currnecy) => `${currnecy.id}` == value)
//           ?.equality!,
//         { emitEvent: false }
//       );
//       newRow.controls.balance.setValue(
//         parseFloat((1 / newRow.controls.equality.value).toFixed(5)),
//         {
//           emitEvent: false,
//         }
//       );
//     });

//     newRow.controls.debit.valueChanges.subscribe((_) => {
//       newRow.controls.credit.setValue('0', { emitEvent: false });
//       this.calculateSum();
//     });
//     newRow.controls.credit.valueChanges.subscribe((_) => {
//       newRow.controls.debit.setValue('0', { emitEvent: false });
//       this.calculateSum();
//     });

//     newRow.controls.balance.valueChanges.subscribe((balance) => {
//       const newValue =
//         balance != 0 ? (1 / (balance ?? 0)).toFixed(5) : '0.00000';
//       newRow.controls.equality.setValue(parseFloat(newValue), {
//         emitEvent: false,
//       });
//     });

//     newRow.controls.equality.valueChanges.subscribe((eq) => {
//       const newBalance = (1 / (eq ?? 0)).toFixed(5);
//       newRow.controls.balance.setValue(parseFloat(newBalance), {
//         emitEvent: false,
//       });
//     });
//     return newRow;
//   }

//   addRow(): void {
//     const newItem = this.createItemRow();
//     this.items.push(newItem);
//     this.updateTableData();
//   }

//   removeRow(index: number): void {
//     this.items.removeAt(index);

//     this.items.at(0).controls['fact'].setValue(1);
//     this.updateTableData();
//   }

//   private updateTableData(): void {
//     this.dataSource.data = this.items.controls;
//   }

//   calculateSum() {
//     this.sumDebit = this.sumCredit = 0;
//     this.items.controls.forEach((group: FormGroup) => {
//       const amountDebit = group.get('debit')?.value ?? 0;
//       const amountCredit = group.get('credit')?.value ?? 0;
//       this.sumDebit += amountDebit;
//       this.sumCredit += amountCredit;
//     });
//     this.minus = this.sumDebit - this.sumCredit;
//   }

//   toOption() {
//     return this.currencies.map((e) => ({
//       key: e.id,
//       value: e.name,
//     }));
//   }
// }
