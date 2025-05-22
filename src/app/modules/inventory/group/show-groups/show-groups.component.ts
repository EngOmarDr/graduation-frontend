import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';

export interface Groups {
  id: string;
  groups: string;
  numberProducts: number;
}

const GROUPS: string[] = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Toys'];

@Component({
  selector: 'app-show-groups',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CardComponent
  ],
  templateUrl: './show-groups.component.html',
})
export class ShowGroupsComponent {
  displayedColumns: string[] = ['id', 'groups', 'numberProducts', 'action'];
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
    this.dataSource.data = this.dataSource.data.filter((g) => g.id !== group.id);
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
    groups: group,
    numberProducts: Math.floor(Math.random() * 100),
  };
}
