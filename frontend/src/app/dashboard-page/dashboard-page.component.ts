import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GrocerService } from '../grocer.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-dashboard',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink
],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardComponent {
  

  allLists : Observable<any>;
  constructor(private grocer: GrocerService){
    this.allLists = this.grocer.getUserGroceryLists()
  }

  getUserGroceryLists(){
    return this.allLists
  }

  deletePage(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
