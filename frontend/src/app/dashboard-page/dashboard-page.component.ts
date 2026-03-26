import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GrocerService, groceryList } from '../grocer.service';
import { CommonModule } from '@angular/common';
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
  

  allLists: groceryList[] = [];
  constructor(private grocer: GrocerService){
    
    
  }
  
  ngOnInit(){
    this.grocer.getUserGroceryLists().subscribe( (res) => {
      this.allLists = res as groceryList[];
    })
  }

  getUserGroceryLists(){
    return this.allLists
  }

  deletePage(index: number, id: number) {
    this.allLists.splice(index,1)
    this.grocer.deleteList(id)
  }
}
