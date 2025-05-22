import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';

@Component({
  selector: 'app-show-prices',
  imports: [RouterModule, CardComponent],
  templateUrl: './show-prices.component.html',
})
export class ShowPricesComponent {
  private readonly route = inject(Router);
  updatePrice() {
    alert('update');
  }
}
