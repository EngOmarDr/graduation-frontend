export interface ItemMovementResponse {
  productId: number;
  productName: string;
  maxSell: number;
  minSell: number;
  avgSell: number;
  maxPurchase: number;
  minPurchase: number;
  avgPurchase: number;
  startDate: Date;
  endDate: Date;
  items: ItemMovementDetailsResponse[];
}

interface ItemMovementDetailsResponse {
  warehouseId: number;
  invoiceHeaderId: number;
  invoiceName: string;
  price: number;
  quantity: number;
  movementType: 'INBOUND' | string;
  date: string;
}
