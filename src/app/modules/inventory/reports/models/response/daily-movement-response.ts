export interface DailyMovementResponse {
  startDate: Date;
  endDate: Date;
  currency: string;
  mainItems: DailyMovementItemResponse[];
  sideItems: SideItemResponse[];
}

interface DailyMovementItemResponse {
  invoiceHeaderId: number;
  invoiceName: string;
  productName: string;
  unitId: number;
  unitName: string;
  warehouseId: number;
  quantity: number;
  individualPrice: number;
  totalPrice: number;
  date: Date;
}

interface SideItemResponse {
  cashTotal: number;
  futureTotal: number;
  invoiceTypeId: number;
  invoiceName: string;
}
