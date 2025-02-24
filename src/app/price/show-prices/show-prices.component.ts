import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-prices',
  imports: [RouterModule],
  templateUrl: './show-prices.component.html',
  styleUrl: './show-prices.component.css'
})
export class ShowPricesComponent {
private readonly route = inject(Router);
  updatePrice() {
    alert('update');
  }
}
