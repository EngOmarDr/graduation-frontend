export interface Currency {
  id?: number;
  code: string;
  name: string;
  currencyValue: number;
  partName?: string;
  partPrecision?: number;
}
