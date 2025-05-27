import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../services/unit.service';
import { Unit } from '../models/unit.model';
import { ToastrService } from 'ngx-toastr';
import { CustomFieldComponent } from '../../../shared/components/custom-field.component';

@Component({
  selector: 'app-update-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomFieldComponent],
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.css'],
})
export class UpdateUnitComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private unitService = inject(UnitService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  editUnitForm!: FormGroup;
unitIdParam!: string;
unitId!: number;

ngOnInit(): void {
  this.unitIdParam = this.route.snapshot.paramMap.get('id')!;
  this.unitId = parseInt(this.unitIdParam, 10);
  this.loadUnit();
}

loadUnit(): void {
  this.unitService.getUnitById(this.unitId).subscribe({
    next: (unit: Unit) => {
      this.initializeForm(unit);
    },
    error: () => {
      this.toastr.error('Unit not found');
    }
  });
}

  initializeForm(unit: Unit): void {
    this.editUnitForm = this.fb.group({
      name: [unit.name, Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.editUnitForm.valid) return;

    this.unitService.updateUnit(this.unitId, this.editUnitForm.value).subscribe({
      next: () => this.toastr.success('Unit updated successfully'),
    });
  }
}
