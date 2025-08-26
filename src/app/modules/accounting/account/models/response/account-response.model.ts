export interface AccountResponse {
  id: number;
  code: string;
  name: string;
  parentId?: number | null;
  parentName?: string | null;
  finalAccount?: number | null;
  finalAccountName?: string | null;
}
