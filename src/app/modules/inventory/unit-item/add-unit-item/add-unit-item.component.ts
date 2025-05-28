import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-add-unit-item',
  templateUrl: './add-unit-item.component.html',
  styleUrls: ['./add-unit-item.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    MatError
  ],
})
export class AddUnitItemComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUnitItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { unitId: number }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      unitId: [this.data.unitId || null, Validators.required],
      name: ['', Validators.required],
      fact: [0, [Validators.required, Validators.min(0.01)]],
      isDef: [false]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
