import { Component } from '@angular/core';
import { CardComponent } from "../../../components/card-form.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-products',
  imports: [CardComponent,RouterModule],
  templateUrl: './show-products.component.html',
})
export class ShowProductsComponent {

}
