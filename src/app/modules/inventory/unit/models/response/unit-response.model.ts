import { UnitItemResponse } from './unit-item-response.model';

export interface UnitResponse {
  id: number;
  name: string;
  unitItems: UnitItemResponse[];
}
