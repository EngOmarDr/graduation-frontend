export interface UserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  warehouseId?: number;
}
