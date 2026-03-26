import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { GrocerService, groceryList, ingredient } from '../grocer.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-list-page',
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './view-list-page.component.html',
  styleUrl: './view-list-page.component.css',
})
export class ViewListPageComponent {
  pushListToPantry() {

    let userId = this.auth.getUserID()
    if(userId == null){
      throw new Error("No userId defined")
    }
    this.grocer.pushItemsToPantry(this.listId,userId).subscribe()
    this.router.navigateByUrl("/dashboard")
  }


  groceryList : ingredient[] = []
  originalListItemsMap : Map<string,any> = new Map()
  listId: any;
  listName: string = "";

  

  constructor(private grocer : GrocerService, private route : ActivatedRoute, private auth : AuthService, private router : Router){
    
    this.listId = this.route.snapshot.paramMap.get('id')!;
    if(this.listId == null){
      throw new Error("No listId")
    }
    
    this.grocer.getGroceryListItems(this.listId).subscribe((res) =>{
      let ingredients = res as any[]
      ingredients.forEach( (ingredient) =>{
        this.groceryList.push(
          {
            itemName: ingredient.itemName,
            quantity: ingredient.quantity,
            category: ingredient.category ? ingredient.category : ""
          }
        )
      
    })
    })

    this.grocer.getGroceryListName(this.listId).subscribe((res) =>{
      if( (res as groceryList).title == null){
        throw new Error("List does not exist")
      }else{
        this.listName = (res as groceryList).title
      }

    })
  }
}

