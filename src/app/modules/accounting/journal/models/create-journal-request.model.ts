import { CreateJournalItemRequest } from "./create-journal-item-request.model";

export interface CreateJournalRequest {
  branchId: number;
  date: Date;
  debit: number;
  credit: number;
  currencyId: number;
  currencyValue: number;
  parentType: number;
  parentId: number;
  isPosted: boolean;
  postDate: Date;
  notes: string;
  items: CreateJournalItemRequest[]
}
