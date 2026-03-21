import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-list-page',
  imports: [
    NavbarComponent,
  ],
  templateUrl: './create-list-page.component.html',
  styleUrl: './create-list-page.component.css'
})
export class CreateListPageComponent {

}
