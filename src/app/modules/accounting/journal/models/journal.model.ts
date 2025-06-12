
export interface JournalHeader {
  branchId: number;
  date: string;
  debit: string;
  credit: string;
  currencyId: number;
  currencyValue: string;
  isPosted: boolean;
}

export interface JournalItem {
  accountId: number;
  debit: string;
  credit: string;
  currencyId: number;
  currencyValue: string;
  date: string;
}

export interface JournalRequest {
  journalHeader: JournalHeader;
  journalItems: JournalItem[];
}

export interface CreateJournalResponse {
  createJournalHeaderResponse: any;
  createJournalItemResponse: any[];
}
