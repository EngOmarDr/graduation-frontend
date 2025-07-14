export interface StockReportResponse {
  startDate: string;
  endDate: string;
  currency: string;
  mainItems: ItemStockResponse[];
  sideItems: SideItemResponse;
}

interface ItemStockResponse {
  productId: number;
  productName: string;
  warehouseId: number;
  unitId: number;
  unitName: string;
  quantity: number;
  totalPrice: number;
}

interface SideItemResponse {
  totalPrice: number;
  totalQuantity: number;
  toatlPricePositive: number;
  totalQuantityPositive: number;
  toatlPriceNegative: number;
  totalQuantityNegative: number;
}
