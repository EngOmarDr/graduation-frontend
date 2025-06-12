import { UnitItemRequest } from './unit-item-request.model';

export interface UnitRequest {
  name: string;
  unitItems: UnitItemRequest[];
}
