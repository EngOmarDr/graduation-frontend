import { UnitItem } from "./unit-item.model";


export interface Unit {
  id?: number;
  name: string;
  unitItems?: UnitItem[];
}
