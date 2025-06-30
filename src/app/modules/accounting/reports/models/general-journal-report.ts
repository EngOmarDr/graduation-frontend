export interface GeneralJournalReport {
  date: Date;
  totalDebit: number;
  totalCredit: number;
  entries: GeneralJournalEntry[];
}

interface GeneralJournalEntry {
  id: number;
  accountId: number;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  notes: string;
}
