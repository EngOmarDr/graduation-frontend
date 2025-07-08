export interface TransferResponse {
  id: number;
  fromWarehouseId: number;
  fromWarehouseName: string;
  toWarehouseId: number;
  toWarehouseName: string;
  date: Date;
  notes: string;
  items: TransferItem[];
}

interface TransferItem {
  productId: number;
  productName: number;
  quantity: number;
}
