import { Component, inject, ViewChild } from '@angular/core';
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
import { CardComponent } from '../../../shared/components/card-form.component';
import { FormArray, NonNullableFormBuilder } from '@angular/forms';
import {CustomTableComponent} from '../../../shared/components/cust-table.component'

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
    CustomTableComponent
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
    private fb = inject(NonNullableFormBuilder);
      tableFormArray = new FormArray<FormGroup>([]);
      columns = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'primaryAccount', label: 'Main Account', type: 'text' },
    { key: 'type', label: 'Type', type: 'text' },
  ];

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => {

      this.tableFormArray.clear();

      accounts.forEach(acc => {
        const group = this.fb.group({
          id: [acc.id],
          name: [acc.name],
          primaryAccount: [acc.primaryAccount],
          type: [acc.type],
        });
        this.tableFormArray.push(group);
      });
    });
  }

  onRowRemoved(index: number) {
    this.tableFormArray.removeAt(index);
  }


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
