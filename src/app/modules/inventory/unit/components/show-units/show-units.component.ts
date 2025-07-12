import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card-form.component';
import { UnitService } from '../../services/unit.service';
import { UnitItemResponse } from '../../models/response/unit-item-response.model';
import { UnitResponse } from '../../models/response/unit-response.model';

@Component({
  selector: 'app-show-units',
  imports: [CardComponent, RouterModule, CommonModule],
  templateUrl: './show-units.component.html',
})
export class ShowUnitsComponent implements OnInit {
  private readonly service = inject(UnitService);
  private readonly router = inject(Router);

  displayedColumns = ['unit Name', ];

  units = signal<UnitResponse[]>([]);
  get unitItems(): UnitItemResponse[][] {
    return this.units().map((e) => e.unitItems);
  }

  ngOnInit(): void {
    this.service.getUnits().subscribe((units) => {
      this.units.set(units);
    });
  }

  updateUnit(object: UnitResponse): void {
    this.router.navigate(['/update-unit', object.id], { state: object });
  }

  deleteUnit(unit: UnitResponse): void {
    if (confirm(`Are you sure you want to delete unit "${unit.name}"?`)) {
      this.service.deleteUnit(unit.id!).subscribe({
        next: () => {
          this.units.update((old) => old.filter((e) => e.id != unit.id));
        },
      });
    }
  }
}
