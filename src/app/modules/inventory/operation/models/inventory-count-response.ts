export interface InventoryCountResponse {
  warehouseId: number;
  warehouseName: string;
  items: InventoryItem[];
}

interface InventoryItem {
  productId: number;
  productName: string;
  unitId: number;
  unitName: string;
  quantity: number;
}
