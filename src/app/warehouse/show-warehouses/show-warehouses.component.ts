import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-warehouses',
  imports: [RouterLink],
  templateUrl: './show-warehouses.component.html',
  styleUrl: './show-warehouses.component.css',
})
export class ShowWarehousesComponent {
  private readonly route = inject(Router);
  updateWarehouse() {
    alert('update');
  }
}
