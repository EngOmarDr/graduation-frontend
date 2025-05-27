export interface GroupTree {
  id?: number;
  code: string;
  name: string;
  notes: string;
  children?: GroupTree[];
}
