export interface PurchaseItemResponse {
  id: number;
  productId: number;
  productName: string;
  qty: number;
  unitItemId: number;
  unitFact: number;
}

export interface PurchaseResponse {
  id: number;
  warehouseId: number;
  warehouseName: string;
  supplyDate: string;
  requestDate: string | null;
  buyDate: string | null;
  receiveDate: string | null;
  status: string;
  notes: string;
  items: PurchaseItemResponse[];
  createdAt: string;
  updatedAt: string;
}
