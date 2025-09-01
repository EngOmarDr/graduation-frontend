export interface LoginResponse {
  firstName: string;
  lastName: string;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'PURCHASE_MANAGER';
  token: string;
  warehouseId?: number;
}
