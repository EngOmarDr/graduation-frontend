import { inject, Pipe, type PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'appFormatNumber',
})
export class FormatNumberPipe implements PipeTransform {
  private readonly translateService = inject(TranslateService);

  transform(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return value.toString();

    const hasDecimals = num % 1 !== 0;

    const currentLang =
      this.translateService.currentLang || this.translateService.defaultLang;

    // const locale = this.getLocaleFromLang(currentLang);

    if (hasDecimals) {
      return num.toLocaleString(currentLang, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return num.toLocaleString(currentLang, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
  }
}
