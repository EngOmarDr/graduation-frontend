export interface WarehouseRequest {
  code: string;
  name: string;
  type: 'POS' | 'WAREHOUSE';
  active: boolean;
  branchId: number;
  parentId?: number;
  phone?: string;
  address?: string;
  notes?: string;
}
