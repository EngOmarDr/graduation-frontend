import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-currencies',
  imports: [RouterLink],
  templateUrl: './show-currencies.component.html',
})
export class ShowCurrenciesComponent {
  private readonly route = inject(Router);
  updateCurrency() {
    this.route.navigate(['update-currency'], {
      state: {
        id: 1,
        code: 'code',
        name: 'name',
        balance: 1,
        eq: 1,
      },
    });
  }
}
