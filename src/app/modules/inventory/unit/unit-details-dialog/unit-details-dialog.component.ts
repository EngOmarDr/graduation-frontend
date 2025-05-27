import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Unit } from '../models/unit.model';

import { MatDialog } from '@angular/material/dialog';
import { AddUnitItemComponent } from '../../unit-item/add-unit-item/add-unit-item.component';
import { UnitItemService } from '../services/unit-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-unit-details-dialog',
  standalone: true,
  templateUrl: './unit-details-dialog.component.html',
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class UnitDetailsDialogComponent {
  
  displayedColumns = ['#', 'name', 'fact', 'isDef', 'action'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Unit,private dialog: MatDialog,
  private unitItemService: UnitItemService,
  private snackBar: MatSnackBar) {}

  editItem(item: any) {
    console.log('Edit', item);
  }

  deleteItem(item: any) {
    console.log('Delete', item);
  }

  showItem(item: any) {
    console.log('Show', item);
  }

  openAddUnitItemDialog(): void {
  const dialogRef = this.dialog.open(AddUnitItemComponent, {
    width: '400px',
    data: { unitId: this.data.id } 
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
            this.unitItemService.createUnitItem(result).subscribe({
              next: (res) => {
        (this.data.unitItems ??= []).push(res);
        this.snackBar.open('Unit item added successfully', 'Close', { duration: 3000 });
      },
        error: () => {
          this.snackBar.open('Failed to add unit item', 'Close', { duration: 3000 });
        }
      });
    }
  });
}

}
