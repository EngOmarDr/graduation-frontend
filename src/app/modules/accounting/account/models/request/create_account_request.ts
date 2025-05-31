export interface CreateAccountRequest {
  name: string;
  code: string;
  primaryAccount?: string;
  finalAccount: number;
}
