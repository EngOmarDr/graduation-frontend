
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

export interface Branch {
  id: number;
  name: string;
  phone: string;
  address: string;
  notes: string | null;
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  currencyValue: number;
  partName: string;
  partPrecision: number;
}

export interface VoucherItem {
  id: number;
  jornalHeader: number;
  accountId: number;
  accountName: string;
  debit: number;
  credit: number;
  currency: Currency;
  currencyValue: number;
  date: string;
  notes: string | null;
}

export interface Voucher {
  id: number;
  branch: Branch;
  date: string;
  debit: number;
  credit: number;
  currency: Currency;
  currencyValue: number;
  parentType: string | null;
  parentId: number | null;
  isPosted: boolean;
  postDate: string | null;
  notes: string | null;
  items: VoucherItem[];
}
