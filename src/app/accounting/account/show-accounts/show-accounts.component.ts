import { Component, ViewChild } from '@angular/core';
import { CardComponent } from '../../../../components/card-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

export interface Groups {
  id: string;
  name: string;
  mainAccount: string;
  type: string;
}

const GROUPS: string[] = [
  'Electronics',
  'Clothing',
  'Books',
  'Furniture',
  'Toys',
];

@Component({
  selector: 'app-show-accounts',
  imports: [
    CardComponent,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    RouterModule,
  ],
  templateUrl: './show-accounts.component.html',
})
export class ShowAccountsComponent {
  displayedColumns: string[] = ['id', 'name', 'main_account', 'type', 'action'];
  dataSource: MatTableDataSource<Groups>;
  form = new FormGroup({
    filter: new FormControl(''),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const groups = Array.from({ length: 20 }, (_, k) => createNewGroup(k + 1));
    this.dataSource = new MatTableDataSource(groups);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editGroup(group: Groups) {
    alert(`Edit Group: ${group.id}`);
  }

  deleteGroup(group: Groups) {
    alert(`Delete Group: ${group.id}`);
    this.dataSource.data = this.dataSource.data.filter(
      (g) => g.id !== group.id
    );
  }

  viewDetails(group: Groups) {
    alert(`View Details for Group: ${group.id}`);
  }
}

/** إنشاء بيانات تجريبية لمجموعة */
function createNewGroup(id: number): Groups {
  const group = GROUPS[Math.floor(Math.random() * GROUPS.length)];
  return {
    id: id.toString(),
    name: group,
    mainAccount: group,
    type: group,
  };
}
