export interface InvoiceRequest {
  warehouseId: number;
  invoiceTypeId: number;
  date: Date|string;
  isSuspended: boolean;
  accountId: number;
  currencyId: number;
  currencyValue: number;
  payType: number;
  isPosted: boolean;
  postedDate?: Date|string;
  notes: string;
  invoiceItems: InvoiceItemRequest[];
  invoiceDiscounts?: InvoiceDiscountRequest[];
}

interface InvoiceItemRequest {
  productId: number;
  qty: number;
  price: number;
  bonusQty: number;
  unitItemId?: number;
  unitFact?: number;
  notes: string;
}

interface InvoiceDiscountRequest {
  account: number;
  discount: number;
  extra: number;
  notes: string;
}
