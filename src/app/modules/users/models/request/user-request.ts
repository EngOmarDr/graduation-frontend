export interface UserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'MANAGER' | 'PURCHASE_MANAGER';
  warehouseId?: number;
}
