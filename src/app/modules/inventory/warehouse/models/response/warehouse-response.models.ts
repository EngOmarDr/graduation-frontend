export interface WarehouseResponse {
  id: number;
  code: string;
  name: string;
  parentWarehouse?: WarehouseResponse;
  address?: string;
  notes?: string;
}
