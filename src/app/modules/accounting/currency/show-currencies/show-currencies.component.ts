import { Component, inject, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../models/currency.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../shared/components/card-form.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-currencies',
  standalone: true,
  imports: [RouterLink, CardComponent, CommonModule,TranslateModule],
  templateUrl: './show-currencies.component.html',
})
export class ShowCurrenciesComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly currencyService = inject(CurrencyService);

  currencies$!: Observable<Currency[]>;

  ngOnInit(): void {
    this.currencies$ = this.currencyService.getCurrencies();
  }

updateCurrency(currency: Currency) {
  this.router.navigate(['update-currency', currency.id]);
}

deleteCurrency(id: number): void {
  if (confirm('Are you sure you want to delete this currency?')) {
    this.currencyService.deleteCurrency(id).subscribe({
      next: () => {
        alert('Currency deleted successfully');
        this.currencies$ = this.currencyService.getCurrencies(); // لإعادة التحديث
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete currency');
      },
    });
  }
}

  showAlert(message: string): void {
    alert(message);
  }
}
