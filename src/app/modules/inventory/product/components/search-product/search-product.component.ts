import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  input,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../models/response/product-response';

@Component({
  selector: 'app-search-product',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './search-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(ProductService);
  private readonly toastr = inject(ToastrService);

  @Input({ required: true }) control!: AbstractControl;
  readonly label = input<string>();
  readonly fetch = input<boolean>(false); // to get object by id
  @Output() productSelected = new EventEmitter<ProductResponse>();

  form = this.fb.group({
    name: [''],
    id: this.fb.control<number | undefined>(undefined),
  });

  isLoading = signal(false);
  showModal = signal(false);
  data = signal<ProductResponse[]>([]);

  searchTerm =
    this.form.controls.name.value.search('-') == 0
      ? this.form.controls.name.value
      : this.form.controls.name.value.split('-')[0];

  selectedObject?: ProductResponse;
  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.control.valueChanges.subscribe((v) => {
      if (!v) {
        this.form.reset();
      }
    });
    if (this.fetch() && this.control.value) {
      this.isLoading.set(true);
      this.service.getProductById(this.control.value).subscribe((next) => {
        this.selectedObject = next;
        this.onSelected();
        this.isLoading.set(false);
      });
    }
    this.form.controls.name.valueChanges.subscribe((value) => {
      this.searchTerm =
        this.form.controls.name.value.search('-') == 0
          ? this.form.controls.name.value
          : this.form.controls.name.value.split('-')[0];
      if (value.toString().trim().length == 0) {
        this.selectedObject = undefined;
      }
    });

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          if (term.trim().length == 0) {
            return [];
          }
          this.isLoading.set(true);
          return this.service.search(term).pipe(
            catchError(() => {
              this.isLoading.set(false);
              return of([]);
            })
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.data.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  onSelected() {
    this.form.controls.name.setValue(
      this.selectedObject?.code + '-' + this.selectedObject?.name
    );
    this.form.controls.id.setValue(this.selectedObject?.id);
    this.control.setValue(this.selectedObject?.id);
    this.productSelected.emit(this.selectedObject);
    this.showModal.set(false);
  }

  submitSearch() {
    if (
      !this.form.controls.name.value ||
      this.form.controls.name.value.length === 0
    ) {
      this.toastr.clear();
      this.toastr.info('Enter value to search');
      return;
    }

    this.isLoading.set(true);
    this.service.search(this.searchTerm).subscribe({
      next: (next) => {
        this.data.set(next);

        this.isLoading.set(false);

        if (next.length === 1) {
          this.selectedObject = next[0];
          this.onSelected();
        } else {
          this.showModal.set(true);
        }
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
  loadData() {
    this.isLoading.set(true);
    this.service.search(this.searchTerm).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading.set(false);
      },
    });
  }

  onSearchChange(term: string) {
    this.searchTerms.next(term);
  }

  selectAccount(account: ProductResponse) {
    this.selectedObject = account;
  }

  onClickOk(object?: ProductResponse) {
    if (object) {
      this.selectedObject = object;
    }

    if (this.selectedObject) {
      this.onSelected();
    }
  }
  onClickCancel() {
    this.form.reset();
    this.control.setValue(undefined);
    this.showModal.set(false);
  }
}
