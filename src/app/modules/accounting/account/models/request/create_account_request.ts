export interface CreateAccountRequest {
  name: string;
  code: string;
  parentId?: number;
  finalAccount: number;
}
