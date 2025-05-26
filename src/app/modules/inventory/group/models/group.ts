export interface Group {
  id?: number;
  code: string;
  name: string;
  notes: string;
  parentId?: number;
  parentName?: string;
}
