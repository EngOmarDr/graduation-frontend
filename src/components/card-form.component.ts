import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cust-card',
  imports: [CommonModule],
  template: `
    <div class="card">
      <h4 class="cust-header" [ngClass]="{ 'pb-7': titlePadding }">
        {{ title }}
      </h4>
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input({ required: true }) title!: string;
  @Input() titlePadding: boolean = true;
}
