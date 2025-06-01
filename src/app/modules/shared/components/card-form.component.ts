import { CommonModule, Location } from '@angular/common';
import { Component, input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'cust-card',
  imports: [CommonModule],
  template: `
    <div class="card">
      <div
        class="flex items-center gap-x-2"
        [ngClass]="{ 'pb-7': titlePadding() }"
      >
        <!-- <mat-icon
          aria-hidden="false"
          aria-label="back button"
          fontIcon="arrow_back"
          *ngIf="showBackButton"
          (click)="goBack()"
        ></mat-icon> -->
        <h4 class="cust-header">
          {{ title() }}
        </h4>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  readonly title = input.required<string>();
  readonly titlePadding = input<boolean>(true);

  showBackButton: boolean = false;
  constructor(private router: Router, private location: Location) {
    // Subscribe to router events to check the current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        // Check if the current URL has one or two segments
        const urlSegments = currentUrl.split('/').filter((segment) => segment);
        this.showBackButton = urlSegments.length >= 2; // Show back button if there are two segments
      });
  }

  goBack() {
      this.location.back();

    // this.router.navigate(['..']);
  }
}
