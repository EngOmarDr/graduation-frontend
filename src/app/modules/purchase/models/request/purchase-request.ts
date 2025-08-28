export interface PurchaseItemRequest {
  productId: number;
  qty: number;
  unitItemId: number;
  unitFact: number;
}

export interface PurchaseRequest {
  warehouseId: number | null;
  supplyDate: string; // ISO Date
  notes: string;
  status?: number;
  items: PurchaseItemRequest[];
}
