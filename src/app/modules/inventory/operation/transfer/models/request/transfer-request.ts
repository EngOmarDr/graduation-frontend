export interface TransferRequest {
  fromWarehouseId: number;
  toWarehouseId: number;
  cashAccountId: number;
  expenseAccountId: number;
  expenseValue: number;
  date: string;
  driverName: string;
  notes?: string;
  items: TransferItem[];
}

export interface TransferItem {
  productId: number;
  qty: number;
  unitItemId?: number;
  unitFact?: number;
}
