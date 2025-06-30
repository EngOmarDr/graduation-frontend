export interface LedgerReport {
  accountId: number;
  accountCode: string;
  accountName: string;
  startDate: Date;
  endDate: Date;
  openingBalance: number;
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
  entries: LedgerEntry[];
}

interface LedgerEntry {
  id: number;
  date: Date;
  debit: number;
  credit: number;
  notes: string;
}
