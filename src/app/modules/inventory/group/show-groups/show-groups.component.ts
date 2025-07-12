import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group';
import {
  TreeNode,
  TreeViewComponent,
} from '../../../shared/components/tree-view.component';
import { GroupTree } from '../models/group-tree';
import { CustomTableComponent } from '../../../shared/components/cust-table.component';
import { filter, map, Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-show-groups',
  standalone: true,
  imports: [
    RouterModule,
    CardComponent,
    TreeViewComponent,
    CustomTableComponent,
    AsyncPipe,
  ],
  templateUrl: './show-groups.component.html',
})
export class ShowGroupsComponent implements OnInit {
  private service = inject(GroupService);
  private router = inject(Router);

  displayedColumns: (keyof Group)[] = ['code', 'name', 'parentName', 'notes'];
  viewTree = signal(false);
  treeData: TreeNode[] = [];

  groups$!: Observable<Group[]>;

  ngOnInit(): void {
    this.groups$ = this.service.getGroups();
  }

  updateGroup(group: Group | number) {
    if (typeof group == 'number') {
      // let data = this.dataSource.data
      //   .filter((value) => {
      //     return value.id == group;
      //   })
      //   .at(0);
      // this.router.navigate(['/update-group', data!.id], {
      //   state: { groupData: data },
      // });
    } else {
      this.router.navigate(['/update-group', group.id], {
        state: { groupData: group },
      });
    }
  }

  deleteGroup(group: Group | number) {
    let data: Group;
    if (typeof group == 'number') {
      // data = this.dataSource.data
      //   .filter((value) => {
      //     return value.id == group;
      //   })
      //   .at(0)!;
    } else {
      data = group;
    }
    this.service.deleteGroup(data!.id!).subscribe({
      next: () => {
        this.groups$
          .pipe(
            map((groups) => groups.filter((group) => group.id != data.id)),
            tap((filteredItems) => (this.groups$ = of(filteredItems)))
          )
          .subscribe();
      },
    });
  }

  changeView(isViewTree: boolean) {
    if (this.treeData.length == 0) {
      this.service.getGroupsTree().subscribe((e) => {
        this.treeData = this.convertToTreeNode(e);
        this.viewTree.set(isViewTree);
      });
    } else {
      this.viewTree.set(isViewTree);
    }
  }

  convertToTreeNode(groups: GroupTree[]): TreeNode[] {
    return groups
      .filter((group) => group.id !== undefined) // Ensure id is defined since TreeNode requires id
      .map((group) => {
        const node: TreeNode = {
          id: group.id as number,
          label: group.code + '-' + group.name,
          expanded: false,
        };
        if (group.children && group.children.length > 0) {
          node.children = this.convertToTreeNode(group.children);
        }
        return node;
      });
  }
}
