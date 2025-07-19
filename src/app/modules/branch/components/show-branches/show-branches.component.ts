import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';
import { BranchResponse } from '../../models/response/branch-response';
import { BranchService } from '../../services/branch.service';
import { map, Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CustomTableComponent } from '@shared/components/cust-table.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-branches',
  imports: [CardComponent, RouterModule, CustomTableComponent, AsyncPipe,TranslateModule],
  templateUrl: './show-branches.component.html',
})
export class ShowBranchesComponent implements OnInit {
  readonly service = inject(BranchService);
  readonly router = inject(Router);

  displayedColumns: (keyof BranchResponse)[] = [
    'name',
    'phone',
    'address',
    'notes',
  ];

  branches$ = new Observable<BranchResponse[]>();

  ngOnInit(): void {
    this.branches$ = this.service.getBranches();
  }

  updateBranch(object: BranchResponse) {
    this.router.navigate(['branches/update-branch', object.id], {
      state: { object },
    });
  }

  deleteBranch(object: BranchResponse) {
    this.service.deleteBranch(object.id).subscribe({
      next: () => {
        this.branches$.pipe(
          map((items) => items.filter((item) => item.id != object.id)),
          tap((filteredItems) => (this.branches$ = of(filteredItems)))
        ).subscribe();
      },
    });
  }
}
