export interface JournalResponse {
  id: number;
  warehouseId: number;
  branchId: number;
  date: string;
  totalDebit: number;
  totalCredit: number;
  currencyId: number;
  currencyValue: number;
  isPosted: boolean;
  parentType: number;
  parentId: number;
  kind: string;
  items: JournalItemResponse[];
}

interface JournalItemResponse {
  id: number;
  accountId: number;
  // accountName: string;
  debit: number;
  credit: number;
  currencyId: number;
  currencyValue: number;
  // date: string;
  notes: string;
}
