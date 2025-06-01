import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';
import { GroupService } from '../services/group.service';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import {
  TreeNode,
  TreeViewComponent,
} from '../../../shared/components/tree-view.component';
import { GroupTree } from '../models/group-tree';

@Component({
  selector: 'app-show-groups',
  standalone: true,
  imports: [
    RouterModule,

    CardComponent,
    TreeViewComponent,
  ],
  templateUrl: './show-groups.component.html',
})
export class ShowGroupsComponent implements OnInit {
  private service = inject(GroupService);
  private router = inject(Router);

  displayedColumns: string[] = ['#', 'code', 'name', 'parentName', 'action'];
  // dataSource: MatTableDataSource<Group> = new MatTableDataSource();
  form = new FormGroup({
    filter: new FormControl(''),
  });
  viewTree = signal(false);
  treeData: TreeNode[] = [];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // groups$!: Observable<Group[]>;

  ngOnInit(): void {
    this.service.getGroups().subscribe((next) => {
      // this.dataSource.data = next;
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  editGroup(group: Group | number) {
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
    }else {
      data = group;
    }
    // alert(`are you sure you want to delete the ${data.name}`);

    // this.service.deleteGroup(data.id!).subscribe(
    //   (next) => {
    //     // this.dataSource.data = this.dataSource.data.filter(
    //     //   (g) => g.id !== data.id
    //     // );
    //     this.treeData = this.convertGroupTreeToTreeNode(this.dataSource.data);
    //     this.changeView()

    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  changeView() {
    if (this.treeData.length == 0) {
      this.service.getGroupsTree().subscribe((e) => {
        this.treeData = this.convertGroupTreeToTreeNode(e);
        this.viewTree.set(!this.viewTree());
      });
    } else {
      this.viewTree.set(!this.viewTree());
    }
  }
  viewDetails(group: Group) {
    alert(`View Details for Group: ${group.id}`);
  }

  convertGroupTreeToTreeNode(groups: GroupTree[]): TreeNode[] {
    return groups
      .filter((group) => group.id !== undefined) // Ensure id is defined since TreeNode requires id
      .map((group) => {
        const node: TreeNode = {
          id: group.id as number,
          label: group.name,
          expanded: false,
        };
        if (group.children && group.children.length > 0) {
          node.children = this.convertGroupTreeToTreeNode(group.children);
        }
        return node;
      });
  }
}
