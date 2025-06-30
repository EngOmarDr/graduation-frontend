export interface UserRequest {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  role: 'USER' | 'ADMIN';
  branchId: number;
}
