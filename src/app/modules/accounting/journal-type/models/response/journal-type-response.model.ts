import { AccountResponse } from 'app/modules/accounting/account/models/response/account-response.model';
import { CurrencyResponse } from 'app/modules/accounting/currency/models/response/currency-response.model';

export interface JournalTypeResponse {
  id: number;
  name: string;
  autoPost: boolean;
  fieldDebit: boolean;
  fieldCredit: boolean;
  fieldNotes: boolean;
  fieldCurrencyName: boolean;
  fieldDate: boolean;
  fieldCurrencyEquilty: boolean;
  defaultCurrency?: CurrencyResponse;
  numberFormat: string;
  debitName: string;
  creditName: string;
  defaultAccountId?: AccountResponse;
}
