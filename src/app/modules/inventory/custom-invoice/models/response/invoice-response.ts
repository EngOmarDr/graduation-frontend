export interface InvoiceResponse {
  id: number;
  warehouseId: number;
  warehouseName: string;
  invoiceTypeId: number;
  invoiceTypeName: string;
  date: Date;
  isSuspended: boolean;
  accountId: number;
  currencyId: number;
  currencyValue: number;
  total: number;
  totalDisc: number;
  totalExtra: number;
  payType: number;
  isPosted: boolean;
  postedDate: Date;
  notes: string;
  invoiceItems: InvoiceItemResponse[];
  invoiceDiscounts: InvoiceDiscountResponse[];
}

interface InvoiceItemResponse {
  id: number;
  invoiceHeaderId: number;
  productId: number;
  productName: string;
  qty: number;
  price: number;
  bonusQty: number;
  unitItemId: number;
  unitItemName: string;
  unitFact: number;
  notes: string;
}

interface InvoiceDiscountResponse {
  id: number;
  invoiceHeaderId: number;
  account: number;
  discount: number;
  extra: number;
  notes: string;
}
