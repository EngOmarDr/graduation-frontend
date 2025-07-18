export interface TransferResponse {
  id: number;
  fromWarehouseId: number;
  fromWarehouseName: string;
  toWarehouseId: number;
  toWarehouseName: string;
  cashAccountId: number;
  expenseAccountId: number;
  expenseValue: number;
  date: string;
  driverName: string;
  notes: string;
  items: TransferItem[];
}

export interface TransferItem {
  id: number;
  productId: number;
  productName: string;
  qty: number;
  unitItemId: number;
  unitFact: number;
}
