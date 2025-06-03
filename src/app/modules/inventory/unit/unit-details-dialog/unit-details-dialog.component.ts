import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-unit-details-dialog',
  standalone: true,
  templateUrl: './unit-details-dialog.component.html',
  imports: [
    CommonModule,

  ],
})
export class UnitDetailsDialogComponent {

  displayedColumns = ['#', 'name', 'fact', 'isDef', 'action'];

  // constructor(@Inject(MAT_DIALOG_DATA) public data: Unit,private dialog: MatDialog,
  // private unitItemService: UnitItemService,
  // private snackBar: MatSnackBar) {}

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
  // const dialogRef = this.dialog.open(AddUnitItemComponent, {
  //   width: '400px',
  //   data: { unitId: this.data.id }
  // });

  // dialogRef.afterClosed().subscribe(result => {
  //   if (result) {
  //           this.unitItemService.createUnitItem(result).subscribe({
  //             next: (res) => {
  //       (this.data.unitItems ??= []).push(res);
  //       this.snackBar.open('Unit item added successfully', 'Close', { duration: 3000 });
  //     },
  //       error: () => {
  //         this.snackBar.open('Failed to add unit item', 'Close', { duration: 3000 });
  //       }
  //     });
  //   }
  // });
}

}
