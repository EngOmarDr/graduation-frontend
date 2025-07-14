export interface InventoryReportRequest {
  startDate: string;
  endDate: string;
  productId?: number;
  groupId?: number;
  warehouseId?: number;
}
