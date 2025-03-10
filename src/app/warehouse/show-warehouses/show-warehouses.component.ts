import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from "../../../components/card-form.component";

@Component({
  selector: 'app-show-warehouses',
  imports: [RouterLink, CardComponent],
  templateUrl: './show-warehouses.component.html',
})
export class ShowWarehousesComponent {
  private readonly route = inject(Router);
  updateWarehouse() {
    alert('update');
  }
}
