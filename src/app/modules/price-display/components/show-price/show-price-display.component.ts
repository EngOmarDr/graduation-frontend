import { Component, inject, linkedSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdvertisementService } from '../../services/Advertisement.service';
import { AdvertisementResponse } from '../../models/advertisement-response';
import { CardComponent } from '@shared/components/card-form.component';
import { map } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-show-price-display',
  imports: [
    CommonModule,
    RouterModule,
    SweetAlert2Module,
    NgOptimizedImage,
    CardComponent,
    TranslateModule
  ],
  templateUrl: './show-price-display.component.html',
  styleUrl: './show-price-display.component.css'
})
export class ShowPriceDisplayComponent {
  constructor(private alert: AlertService) {}
  private readonly router = inject(Router);
  private readonly service = inject(AdvertisementService);

adsReadonly = toSignal(
  this.service.getAll().pipe(
    map((ads) =>
      ads.map((ad: any) => ({
        ...ad,
        title: ad.name,
        type: ad.mediaUrl.endsWith('.mp4') ? 'video' : 'image',
      }))
    )
  ),
  { initialValue: [] }
);
  ads = linkedSignal(() => this.adsReadonly());
  displayColumns = ['title', 'media', 'duration'];

updateAd(ad: AdvertisementResponse) {
  this.router.navigate(['advertisements/update-advertisement', ad.id]);
}


  deleteAd(ad: AdvertisementResponse) {
    this.service.delete(ad.id).subscribe(() => {
      this.ads.update((old) => old.filter((e) => e.id !== ad.id));
    });
    this.alert.showSuccess('deleted');
  }
}
