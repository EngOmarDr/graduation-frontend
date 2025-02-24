import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-categories',
  imports: [RouterModule],
  templateUrl: './show-categories.component.html',
})
export class ShowCategoriesComponent {
  updateGroup() {
    alert('update');
  }
}
