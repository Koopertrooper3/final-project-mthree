import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { GrocerService, pantryItem,  } from '../grocer.service';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-pantry-page',
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './pantry-page.component.html',
  styleUrl: './pantry-page.component.css',
})


export class PantryPageComponent {

  pantryItems : pantryItem[] = []
  originalPantryItemsMap : Map<string,pantryItem> = new Map()

  increaseQuantity(index: number) {
    this.pantryItems[index].quantity += 1
  }
  decreaseQuantity(index: number) {
    this.pantryItems[index].quantity -= 1
  }

  ngOnDestroy(){
    this.grocer.updatePantry(this.originalPantryItemsMap,this.pantryItems)
  }




  constructor(private grocer : GrocerService, private authService : AuthService){
    this.grocer.getPantryItems(this.authService.getUserID()!).subscribe((res) =>{

      this.pantryItems = res as pantryItem[]
      this.pantryItems.forEach( (val) => {
        this.originalPantryItemsMap.set(val.itemName,JSON.parse(JSON.stringify(val)))
      }) 
      
    })
  }
}
