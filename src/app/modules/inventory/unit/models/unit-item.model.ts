export interface UnitItem {
  id: number;
  unitId: number;
  unitName: string;
  name: string;
  fact: number;
  isDef: boolean;
  barcodes: string[] | null;
}