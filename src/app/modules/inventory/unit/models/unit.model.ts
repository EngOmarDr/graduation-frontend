export interface UnitItem {
  name: string;
  fact: number;
  isDef: boolean;
}

export interface Unit {
  id?: number;
  name: string;
  unitItems?: UnitItem[];
}