export interface CreateJournalRequest {
  warehouseId: number;
  date: string;
  currencyId: number;
  currencyValue: number;
  kind: number|null;
  parentId: number|null;
  parentTypeId: number|null;
  isPosted: boolean;
  // postDate: Date;
  // notes: string;
  journalItems: CreateJournalItemRequest[];
}

export interface CreateJournalItemRequest {
  accountId: number;
  debit: number;
  credit: number;
  currencyId?: number;
  currencyValue?: number;
  // date?: string;
  notes?: string;
}
