export interface LoginResponse {
  firstName: string;
  lastName: string;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  token: string;
  warehouseId?: number;
}
