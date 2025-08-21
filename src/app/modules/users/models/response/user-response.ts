export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  warehouseId?: number;
}
