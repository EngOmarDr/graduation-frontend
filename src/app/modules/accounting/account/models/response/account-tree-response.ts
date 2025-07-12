export interface AccountTreeResponse {
  id: number;
  code: string;
  name: string;
  finalAccountName?: string;
  children: AccountTreeResponse[];
}
