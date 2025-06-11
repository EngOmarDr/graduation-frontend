export interface CreateJournalItemRequest {
  accountId: number;
  debit: number;
  credit: number;
  currencyId: number;
  currencyValue: number;
  date: Date;
  notes: string;
}
