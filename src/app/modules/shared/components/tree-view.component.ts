import { CommonModule } from '@angular/common';
import { Component, OnInit, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TreeNode {
  label: string;
  id: number;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-tree-view',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-h-80 overflow-y-auto py-1 ">
      <!-- <input
        type="text"
        [(ngModel)]="filterText"
        placeholder="Filter..."
        class="m-0 mb-4 cust-input max-w-sm"
        (input)="applyFilter()"
      /> -->
      <!-- <div class="flex space-x-1 mb-1">
        <button
          (click)="expandAll()"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Expand All
        </button>
        <button
          (click)="collapseAll()"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Collapse All
        </button>
      </div> -->

      <ul class="select-none" *ngIf="filteredData.length; else noResults">
        <ng-container *ngFor="let node of filteredData">
          <li class="mb-1">
            <div
              class="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1"
              (click)="toggleNode(node)"
            >
              <svg
                *ngIf="node.children?.length"
                [class.rotate-90]="node.expanded"
                class="w-4 h-4 mr-2 transform transition-transform duration-200 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span
                class="text-gray-900 dark:text-gray-100"
                [innerHTML]="highlightText(node.label, filterText)"
              ></span>
              <!-- <button
                class="cursor-pointer ms-2"
                title="edit"
                type="button"
                (click)="update(node.id)"
              >
                <svg
                  class="fill-green-600"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m16.19 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.37c0 3.65 2.17 5.82 5.81 5.82h8.37c3.64 0 5.81-2.17 5.81-5.81v-8.38c.01-3.64-2.16-5.81-5.8-5.81zm-5.24 15.51c-.29.29-.84.57-1.24.63l-2.46.35c-.09.01-.18.02-.27.02-.41 0-.79-.14-1.06-.41-.33-.33-.47-.81-.39-1.34l.35-2.46c.06-.41.33-.95.63-1.24l4.46-4.46c.08.21.16.42.27.66.1.21.21.43.33.63.1.17.21.33.3.45.11.17.24.33.32.42.05.07.09.12.11.14.25.3.54.58.79.79.07.07.11.11.13.12.15.12.3.24.43.33.16.12.32.23.49.32.2.12.42.23.64.34.23.1.44.19.65.26zm6.42-6.42-.92.93c-.06.06-.14.09-.22.09-.03 0-.07 0-.09-.01-2.03-.58-3.65-2.2-4.23-4.23-.03-.11 0-.23.08-.3l.93-.93c1.52-1.52 2.97-1.49 4.46 0 .76.76 1.13 1.49 1.13 2.25-.01.72-.38 1.44-1.14 2.2z"
                    fill="oklch(0.627 0.194 149.214)"
                  />
                </svg>
              </button>

              <button
                class="cursor-pointer"
                title="edit"
                type="button"
                (click)="delete(node.id)"
              >
                <svg
                  class="fill-red-500"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21.0697 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33003 0-2.55003 1.32-2.71003 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82s.4.71.82.67l2.04-.2c5.24003-.52 10.52003-.32 15.82003.21h.08c.38 0 .71-.29.75-.68.03-.41-.27-.78-.69-.82z"
                  />
                  <path
                    d="m19.2297 8.14c-.24-.25-.57-.39-.91-.39h-12.63995c-.34 0-.68.14-.91.39s-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.41995c3.49 0 3.6301-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95zm-5.57 9.61h-3.33c-.40995 0-.74995-.34-.74995-.75s.34-.75.74995-.75h3.33c.41 0 .75.34.75.75s-.34.75-.75.75zm.84-4h-4.99995c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.99995c.41 0 .75.34.75.75s-.34.75-.75.75z"
                  />
                </svg>
              </button> -->
            </div>
            <ul
              *ngIf="node.children && node.expanded"
              class="ml-6 border-l border-gray-300 dark:border-gray-600 pl-4 mt-1"
            >
              <ng-container
                *ngTemplateOutlet="
                  treeNodeTemplate;
                  context: { nodes: node.children }
                "
              ></ng-container>
            </ul>
          </li>
        </ng-container>
      </ul>

      <ng-template #treeNodeTemplate let-nodes="nodes">
        <ng-container *ngFor="let child of nodes">
          <li class="mb-1">
            <div
              class="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1"
              (click)="toggleNode(child)"
            >
              <svg
                *ngIf="child.children?.length"
                [class.rotate-90]="child.expanded"
                class="w-4 h-4 mr-2 transform transition-transform duration-200 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span
                class="text-gray-900 dark:text-gray-100"
                [innerHTML]="highlightText(child.label, filterText)"
              ></span>
              <!-- <button
                class="cursor-pointer ms-2"
                title="edit"
                type="button"
                (click)="update(child.id)"
              >
                <svg
                  class="fill-green-600"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m16.19 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.37c0 3.65 2.17 5.82 5.81 5.82h8.37c3.64 0 5.81-2.17 5.81-5.81v-8.38c.01-3.64-2.16-5.81-5.8-5.81zm-5.24 15.51c-.29.29-.84.57-1.24.63l-2.46.35c-.09.01-.18.02-.27.02-.41 0-.79-.14-1.06-.41-.33-.33-.47-.81-.39-1.34l.35-2.46c.06-.41.33-.95.63-1.24l4.46-4.46c.08.21.16.42.27.66.1.21.21.43.33.63.1.17.21.33.3.45.11.17.24.33.32.42.05.07.09.12.11.14.25.3.54.58.79.79.07.07.11.11.13.12.15.12.3.24.43.33.16.12.32.23.49.32.2.12.42.23.64.34.23.1.44.19.65.26zm6.42-6.42-.92.93c-.06.06-.14.09-.22.09-.03 0-.07 0-.09-.01-2.03-.58-3.65-2.2-4.23-4.23-.03-.11 0-.23.08-.3l.93-.93c1.52-1.52 2.97-1.49 4.46 0 .76.76 1.13 1.49 1.13 2.25-.01.72-.38 1.44-1.14 2.2z"
                    fill="oklch(0.627 0.194 149.214)"
                  />
                </svg>
              </button>

              <button
                class="cursor-pointer"
                title="edit"
                type="button"
                (click)="delete(child.id)"
              >
                <svg
                  class="fill-red-500"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21.0697 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33003 0-2.55003 1.32-2.71003 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82s.4.71.82.67l2.04-.2c5.24003-.52 10.52003-.32 15.82003.21h.08c.38 0 .71-.29.75-.68.03-.41-.27-.78-.69-.82z"
                  />
                  <path
                    d="m19.2297 8.14c-.24-.25-.57-.39-.91-.39h-12.63995c-.34 0-.68.14-.91.39s-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.41995c3.49 0 3.6301-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95zm-5.57 9.61h-3.33c-.40995 0-.74995-.34-.74995-.75s.34-.75.74995-.75h3.33c.41 0 .75.34.75.75s-.34.75-.75.75zm.84-4h-4.99995c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.99995c.41 0 .75.34.75.75s-.34.75-.75.75z"
                  />
                </svg>
              </button> -->
            </div>
            <ul
              *ngIf="child.children && child.expanded"
              class="ml-6 border-l border-gray-300 dark:border-gray-600 pl-4 mt-1"
            >
              <ng-container
                *ngTemplateOutlet="
                  treeNodeTemplate;
                  context: { nodes: child.children }
                "
              ></ng-container>
            </ul>
          </li>
        </ng-container>
      </ng-template>

      <ng-template #noResults>
        <p class="text-gray-500 dark:text-gray-400 text-center mt-4">
          No matching items found.
        </p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class TreeViewComponent implements OnInit {
  readonly treeData = input.required<TreeNode[]>();
  readonly onUpdate = output<number>();
  readonly onDelete = output<number>();

  filteredData: TreeNode[] = [];

  filterText: string = '';

  ngOnInit() {
    this.filteredData = this.cloneTree(this.treeData());
  }

  toggleNode(node: TreeNode): void {
    if (node.children?.length) {
      node.expanded = !node.expanded;
    }
  }

  applyFilter() {
    if (!this.filterText) {
      // If filter is empty, reset tree and collapse all nodes
      this.filteredData = this.cloneTree(this.treeData());
    } else {
      this.filteredData = this.filterTree(
        this.treeData(),
        this.filterText.toLowerCase()
      );
      // Expand all nodes that have matching children or themselves match
      this.expandMatches(this.filteredData);
    }
  }

  private expandMatches(nodes: TreeNode[]) {
    for (const node of nodes) {
      if (node.children && node.children.length) {
        node.expanded = true;
        this.expandMatches(node.children);
      }
    }
  }

  private cloneTree(nodes: TreeNode[]): TreeNode[] {
    return nodes.map((node) => ({
      id: node.id,
      label: node.label,
      expanded: false,
      children: node.children ? this.cloneTree(node.children) : undefined,
    }));
  }

  private filterTree(nodes: TreeNode[], filterText: string): TreeNode[] {
    const filtered: TreeNode[] = [];
    for (const node of nodes) {
      // Check if current node label matches filter
      const isMatch = node.label.toLowerCase().includes(filterText);
      if (isMatch) {
        // If node matches, include it with all children unfiltered (clone children as is)
        filtered.push({
          id: node.id,
          label: node.label,
          expanded: false,
          children: node.children ? this.cloneTree(node.children) : undefined,
        });
      } else if (node.children) {
        // If node doesn't match, filter children recursively
        const filteredChildren = this.filterTree(node.children, filterText);
        if (filteredChildren.length > 0) {
          // Include node with filtered children only
          filtered.push({
            id: node.id,
            label: node.label,
            expanded: false,
            children: filteredChildren,
          });
        }
      }
      // else (no match and no children matching) do not include node
    }
    return filtered;
  }

  highlightText(text: string, filter: string): string {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.replace(
      regex,
      `<span class="bg-yellow-300 dark:bg-yellow-600">$1</span>`
    );
  }

  update(id: number) {
    this.onUpdate.emit(id);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  expandAll() {
    this.setAllNodesExpanded(true);
  }
  collapseAll() {
    this.setAllNodesExpanded(false);
  }
  private setAllNodesExpanded(expanded: boolean) {
    this.filteredData.forEach((node) => {
      node.expanded = expanded;
      if (node.children) {
        this.setChildrenExpanded(node.children, expanded);
      }
    });
  }
  private setChildrenExpanded(nodes: TreeNode[], expanded: boolean) {
    nodes.forEach((node) => {
      node.expanded = expanded;
      if (node.children) {
        this.setChildrenExpanded(node.children, expanded);
      }
    });
  }
}
