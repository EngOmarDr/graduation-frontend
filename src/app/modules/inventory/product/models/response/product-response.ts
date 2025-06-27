import { ProductBarcodeResponse } from "./product-barcode-response";
import { ProductPriceResponse } from "./product-price-response";

export interface ProductResponse {
  id: number;
  code: string;
  name: string;
  type: number;
  groupId: number;
  image: string;
  defaultUnitId: number;
  quantity: number;
  minQty: number;
  maxQty: number;
  orderQty: number;
  notes: string;
  prices: ProductPriceResponse[];
  barcodes: ProductBarcodeResponse[];
}
