export interface JournalTypeRequest {
  name: string;
  autoPost: boolean;
  fieldDebit: boolean;
  fieldCredit: boolean;
  fieldNotes: boolean;
  fieldCurrencyName: boolean;
  fieldCurrencyEquilty: boolean;
  defaultCurrencyId?: number;
  fieldDate: boolean;
  numberFormat: string;
  debitName: string;
  creditName: string;
  defaultAccountId?: number;
}
