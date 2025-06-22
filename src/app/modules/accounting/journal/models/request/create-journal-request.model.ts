export interface CreateJournalRequest {
  branchId: number;
  date: string;
  currencyId: number;
  currencyValue: number;
  parentType: number;
  isPosted: boolean;
  // postDate: Date;
  // notes: string;
  journalItems: CreateJournalItemRequest[]
}

interface CreateJournalItemRequest {
  accountId: number;
  debit: number;
  credit: number;
  currencyId?: number;
  currencyValue?: number;
  date?: string;
  notes?: string;
}
