export interface JournalResponse {
  id: number;
  warehouseId: number;
  date: string;
  totalDebit: number;
  totalCredit: number;
  currencyId: number;
  currencyValue: number;
  isPosted: boolean ;
  parentType: number;
  // postDate: string;
  // notes: string | null;
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
