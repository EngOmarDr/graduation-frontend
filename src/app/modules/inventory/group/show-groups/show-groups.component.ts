import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
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
import { HelperFunctionsService } from 'app/core/services/helper-functions.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-groups',
  standalone: true,
  imports: [
    RouterModule,
    CardComponent,
    TreeViewComponent,
    CustomTableComponent,
    TranslateModule
  ],
  templateUrl: './show-groups.component.html',
})
export class ShowGroupsComponent {
  private service = inject(GroupService);
  private router = inject(Router);
  private helper = inject(HelperFunctionsService);

  displayedColumns: (keyof Group)[] = ['code', 'name', 'parentName', 'notes'];
  viewTree = signal(false);
  treeData: TreeNode[] = [];

  groups = linkedSignal(
    toSignal(this.service.getGroups(), { initialValue: [] })
  );
  code = computed(() =>
    this.helper.addOneToString(
      this.groups().at(this.groups().length - 1)?.code ?? ''
    )
  );

  updateGroup(group: Group) {
    this.router.navigate(['/update-group', group.id], {
      state: { groupData: group },
    });
  }

  deleteGroup(group: Group) {
    this.service.deleteGroup(group.id!).subscribe({
      next: () => {
        this.groups.update((old) => old.filter((item) => item.id != group.id));
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
