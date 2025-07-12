export interface WarehouseTreeResponse {
  id: number;
  name: string;
  code: string;
  branchId: number;
  branchName: string;
  isActive: boolean;
  type: 'POS' | 'WAREHOUSE';
  phone?: string;
  address?: string;
  parentId?: number;
  warehouseParentName?: string;
  notes: string;
  children: WarehouseTreeResponse[];
}
