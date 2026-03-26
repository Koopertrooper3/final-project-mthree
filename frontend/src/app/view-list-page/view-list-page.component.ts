import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { GrocerService, groceryList, ingredient } from '../grocer.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, RouterLink } from '@angular/router';

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
    throw new Error('Method not implemented.');
  }


  groceryList : ingredient[] = []
  originalListItemsMap : Map<string,any> = new Map()
  listId: any;
  listName: string = "";

  ngOnDestroy(){
    //this.grocer.updatePantry(this.originalPantryItemsMap,this.pantryItems)
  }

  constructor(private grocer : GrocerService, private route : ActivatedRoute){
    
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

