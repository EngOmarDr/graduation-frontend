import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CardComponent } from '../../../../components/card-form.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFieldComponent } from '../../../../components/custom-field.component';
import { CustomSelectComponent } from '../../../../components/custom-select.component';
import { ValidationMessageComponent } from '../../../../components/validation-message.component';
import { MatIconModule } from '@angular/material/icon';
import { Currency } from '../../currency/service/currency';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-journal',
  imports: [
    CardComponent,
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    CustomSelectComponent,
    ValidationMessageComponent,
    MatIconModule,
    FormsModule,
    MatAutocompleteModule
  ],
  templateUrl: './add-journal.component.html',
})
export class AddJournalComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);

  currencies: Currency[] = [];
  form = this.fb.group({
    date: [this.getCurrentDate(), [Validators.required]],
    postDate: [this.getCurrentDate()],
    currency: ['', [Validators.required]],
    equality: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
    notes: [''],
    items: this.fb.array([], Validators.required),
  });

  sum = 0;
  minus = 0;

  ngOnInit(): void {
    this.currencies = [
      {
        id: 1,
        equality: 1.0,
        name: 'ليرة سورية',
      },
      {
        id: 2,
        equality: 100000.0,
        name: 'دولار',
      },
    ];
    this.form.controls.currency.valueChanges.subscribe((value) => {
      this.form.controls.equality.setValue(
        this.currencies.find((currnecy) => `${currnecy.id}` == value)?.equality,
        { emitEvent: false }
      );
    });
  }

  options = [];

  filteredOptions: Observable<any>=new Observable();

  filter(val: string): Observable<any> {
    return this.searchAccounts()

      .pipe(
        map((response) =>
          response.filter((option:any) => {
            return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0;
          })
        )
      );
  }
  accounts: any = [];
  searchAccounts() {
    return this.accounts.length
      ? of(this.accounts)
      : this.http
          .get('https://jsonplaceholder.typicode.com/photos')
          .pipe(tap((data) => (this.accounts = data)));
  }

  getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    console.log(this.form.value);
  }

  displayedColumns: string[] = [
    '#',
    'account',
    'notes',
    'debit',
    'credit',
    'currency',
    'balance',
    'equality',
    'group',
    'date',
    'contra account',
    'actions',
  ];
  dataSource = new MatTableDataSource<AbstractControl>([]);

  get items(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  createItemRow(): FormGroup {
    const newRow = this.fb.group({
      account: ['', Validators.required],
      notes: [''],
      debit: ['', [Validators.min(0), Validators.required]],
      credit: ['', [Validators.min(0), Validators.required]],
      currency: ['', [Validators.required]],
      balance: this.fb.control<number>(1, Validators.required),
      equality: this.fb.control<number>(1, Validators.required),
      group: ['', [Validators.required]],
      date: ['', [Validators.required]],
      contraAccount: ['', [Validators.required]],
    });
    this.filteredOptions = newRow.controls.account.valueChanges.pipe(
      startWith(''),

      debounceTime(400),

      distinctUntilChanged(),

      switchMap((val) => {
        return this.filter(val || '');
      })
    );
    newRow.controls.currency.valueChanges.subscribe((value) => {
      newRow.controls.equality.setValue(
        this.currencies.find((currnecy) => `${currnecy.id}` == value)
          ?.equality!,
        { emitEvent: false }
      );
      newRow.controls.balance.setValue(
        parseFloat((1 / newRow.controls.equality.value).toFixed(5)),
        {
          emitEvent: false,
        }
      );
    });

    newRow.controls.debit.valueChanges.subscribe((_) => {
      this.calculateSum();
    });
    newRow.controls.credit.valueChanges.subscribe((_) => {
      this.calculateSum();
    });

    newRow.controls.balance.valueChanges.subscribe((balance) => {
      const newValue =
        balance != 0 ? (1 / (balance ?? 0)).toFixed(5) : '0.00000';
      newRow.controls.equality.setValue(parseFloat(newValue), {
        emitEvent: false,
      });
    });

    newRow.controls.equality.valueChanges.subscribe((eq) => {
      const newBalance = (1 / (eq ?? 0)).toFixed(5);
      newRow.controls.balance.setValue(parseFloat(newBalance), {
        emitEvent: false,
      });
    });
    return newRow;
  }

  addRow(): void {
    const newItem = this.createItemRow();
    this.items.push(newItem);
    this.updateTableData();
  }

  removeRow(index: number): void {
    this.items.removeAt(index);

    this.items.at(0).controls['fact'].setValue(1);
    this.updateTableData();
  }

  private updateTableData(): void {
    this.dataSource.data = this.items.controls;
  }

  calculateSum() {
    this.items.controls.forEach((group: FormGroup) => {
      const amount = group.get('debit')?.value;
      const mAmount = group.get('credit')?.value;
      this.minus += mAmount ? mAmount : 0;
      this.sum += amount ? amount : 0; // Add to sum, default to 0 if undefined
    });
  }

  toOption() {
    return this.currencies.map((e) => ({
      key: e.id,
      value: e.name,
    }));
  }
}
