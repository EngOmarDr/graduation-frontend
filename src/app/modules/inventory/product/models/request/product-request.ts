import { ProductBarcodeRequest } from './product-barcode-request';
import { ProductPriceRequest } from './product-price-request';

export interface ProductRequest {
  code: string;
  name: string;
  type:number;
  image?: File;
  groupId: number;
  defaultUnitId: number;
  minQty: number;
  maxQty: number;
  orderQty: number;
  notes?: string;
  prices: ProductPriceRequest[];
  barcodes: ProductBarcodeRequest[];
}
