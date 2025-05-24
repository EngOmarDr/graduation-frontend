import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../../shared/components/card-form.component';
import { Unit } from '../models/unit.model';
import { UnitService } from '../services/unit.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-units',
  imports: [
    CardComponent,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './show-units.component.html',
  styleUrl: './show-units.component.css',
})

export class ShowUnitsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['#', 'name', 'action'];
  dataSource: MatTableDataSource<Unit> = new MatTableDataSource<Unit>();

  form = new FormGroup({
    filter: new FormControl(''),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private unitService: UnitService, private router: Router) {}

  ngOnInit(): void {
    this.loadUnits();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUnits(): void {
    this.unitService.getUnits().subscribe({
      next: (units) => {
        this.dataSource.data = units;
      },
      error: (error) => {
        console.error('Failed to fetch units:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUnit(unit: Unit): void {
    this.router.navigate(['/edit-unit', unit.id]);
  }

  deleteUnit(unit: Unit): void {
    if (confirm(`Are you sure you want to delete unit "${unit.name}"?`)) {
      this.unitService.deleteUnit(unit.id!).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== unit.id);
        },
        error: (error) => {
          console.error('Failed to delete unit:', error);
        }
      });
    }
  }
}
