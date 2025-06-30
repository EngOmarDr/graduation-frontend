export interface TrialBalanceReport {
  startDate: Date;
  endDate: Date;
  totalDebit: number;
  totalCredit: number;
  entries: TrialBalanceEntry[];
}

interface TrialBalanceEntry {
  accountId: number;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
}
