import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from "../../../components/card-form.component";

@Component({
  selector: 'app-show-groups',
  imports: [RouterModule, CardComponent],
  templateUrl: './show-groups.component.html',
})
export class ShowGroupsComponent {
  updateGroup() {
    alert('update');
  }
}
