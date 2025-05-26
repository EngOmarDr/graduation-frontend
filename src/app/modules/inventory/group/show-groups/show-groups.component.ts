import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';
import { GroupService } from '../services/group.service';
import { Observable } from 'rxjs';
import { Group } from '../models/group';

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
    CardComponent,
  ],
  templateUrl: './show-groups.component.html',
})
export class ShowGroupsComponent implements OnInit {
  private service = inject(GroupService);
  private router = inject(Router);

  displayedColumns: string[] = ['#', 'code', 'name', 'parentName', 'action'];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource();
  form = new FormGroup({
    filter: new FormControl(''),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // groups$!: Observable<Group[]>;

  ngOnInit(): void {
    this.service.getGroups().subscribe((next) => {
      this.dataSource.data = next;
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

  editGroup(group: Group) {
    this.router.navigate(['/update-group', group.id], {
      state: { groupData: group },
    });
  }

  deleteGroup(group: Group) {
    alert(`are you sure you want to delete the ${group.name}`);
    this.service.deleteGroup(group.id!).subscribe(next=>{

      this.dataSource.data = this.dataSource.data.filter(
        (g) => g.id !== group.id
      );
    },err=>{
      console.log(err);

    });
  }

  viewDetails(group: Group) {
    alert(`View Details for Group: ${group.id}`);
  }
}
