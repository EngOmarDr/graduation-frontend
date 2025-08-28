export interface PurchaseItemRequest {
  productId: number;
  qty: number;
  unitItemId: number;
  unitFact: number;
}

export interface PurchaseRequest {
  warehouseId: number;
  supplyDate: string; // ISO Date
  notes: string;
  items: PurchaseItemRequest[];
}
