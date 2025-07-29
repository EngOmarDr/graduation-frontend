import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { ToastrService } from 'ngx-toastr';
import { CustomFieldComponent } from '../../../../shared/components/custom-field.component';
import { UnitResponse } from '../../models/response/unit-response.model';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';


@Component({
  selector: 'app-update-unit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFieldComponent,
    CardComponent,
    ValidationMessageComponent,
    TranslateModule
  ],
  templateUrl: './update-unit.component.html',
})
export class UpdateUnitComponent implements OnInit {
  constructor(private alert: AlertService) {}
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(UnitService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly toastr = inject(ToastrService);

  form = this.fb.group({
    name: ['', Validators.required],
    unitItems: this.fb.array(
      [
        this.fb.group({
          name: ['', Validators.required],
          fact: this.fb.control<number>(1, [Validators.min(0)]),
          isDef: [true],
        }),
      ],
      Validators.required
    ),
  });

  get unitItems(): FormArray<FormGroup> {
    return this.form.get('unitItems') as FormArray<FormGroup>;
  }

  addRow(): void {
    const item = this.fb.group({
      name: ['', Validators.required],
      fact: this.fb.control<number>(1, [
        Validators.required,
        Validators.min(0),
      ]),
      isDef: [this.unitItems.length === 0],
    });
    this.unitItems.push(item);
  }

  removeRow(index: number): void {
    const row = this.unitItems.at(index);
    if (row.get('isDef')?.value === true) {
      alert("Can't delete default unit");
      return;
    }
    this.unitItems.removeAt(index);
    if (this.unitItems.length > 0) {
      this.unitItems.at(0).get('fact')?.setValue(1);
    }
  }

  changeIsDef(index: number): void {
    this.unitItems.controls.forEach((control, i) => {
      control.get('isDef')?.setValue(i === index);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.getRawValue());

    this.service.updateUnit(this.unitId, this.form.getRawValue()).subscribe({
      next: () => {
        this.alert.showSuccess('updated');
        this.location.back();
      },
    });
  }
  unit: UnitResponse | undefined;
  unitId!: number;

  ngOnInit(): void {
    const navigation = window.history.state as UnitResponse;

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id == null) {
      this.location.back();
    } else {
      this.unitId = Number.parseInt(id);
      if (navigation) {
        this.form.patchValue(navigation);
        this.unitItems.clear();
        navigation.unitItems.forEach((element) => {
          this.unitItems.push(
            this.fb.group({
              name: [element.name, Validators.required],
              fact: this.fb.control<number>(element.fact, [
                Validators.required,
                Validators.min(0),
              ]),
              isDef: [element.isDef],
            })
          );
        });
      } else {
        this.service.getUnitById(this.unitId!).subscribe({
          next: (next) => {
            this.form.patchValue(next);
          },
          error: () => {
            this.location.back();
          },
        });
      }
    }
  }
}
