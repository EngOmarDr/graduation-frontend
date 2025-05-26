import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card-form.component';
import { PriceService } from '../../services/price.service';
import { Price } from '../../models/price';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-show-prices',
  imports: [RouterModule, CardComponent, AsyncPipe],
  templateUrl: './show-prices.component.html',
})
export class ShowPricesComponent implements OnInit {
  private readonly router = inject(Router);
  private service = inject(PriceService);

  private data$: Observable<Price[]> = this.service.getPrices();
  private pricesSubject = new BehaviorSubject<Price[]>([]);
  prices$ = this.pricesSubject.asObservable();

  ngOnInit(): void {
    this.data$.subscribe((prices) => {
      this.pricesSubject.next(prices);
    });
  }

  updatePrice(item: Price) {
    this.router.navigate(['update-price', item.id!.toString()], {
      state: item,
    });
  }
  deletePrice(id: number) {
    this.service.deletePrice(id).subscribe(() => {
      const currentPrices = this.pricesSubject.getValue();
      const updatedPrices = currentPrices.filter((price) => price.id !== id);
      this.pricesSubject.next(updatedPrices);
    });
  }
}
