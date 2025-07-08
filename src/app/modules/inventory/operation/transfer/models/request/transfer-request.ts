export interface TransferRequest {
  fromWarehouseId: number;
  toWarehouseId: number;
  date: Date;
  notes: string;
  items: TransferItem[];
}

interface TransferItem {
  productId: number;
  quantity: number;
}
