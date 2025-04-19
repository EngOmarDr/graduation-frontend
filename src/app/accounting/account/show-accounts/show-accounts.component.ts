import { Component, inject, ViewChild } from '@angular/core';
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
import { AccountService } from '../service/account-service.service';
import { Account } from '../service/account';
import { Observable } from 'rxjs';

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
  private accountService = inject(AccountService);
  accounts: Account[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'primaryAccount',
    'type',
    'action',
  ];
  dataSource: MatTableDataSource<Account> = new MatTableDataSource();
  form = new FormGroup({
    filter: new FormControl(''),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.accountService.getAccounts().subscribe((item) => {
      this.dataSource.data = item;
    });
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

  editGroup(group: Account) {
    alert(`Edit Group: ${group.id}`);
  }

  deleteGroup(group: Account) {
    alert(`Delete Group: ${group.id}`);
    this.dataSource.data = this.dataSource.data.filter(
      (g) => g.id !== group.id
    );
  }

  viewDetails(group: Account) {
    alert(`View Details for Group: ${group.id}`);
  }
}
