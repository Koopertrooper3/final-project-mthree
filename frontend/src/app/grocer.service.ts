import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';

export interface ingredient{
  itemName: string
  quantity: number
  category: string
}
export interface groceryList{
  createdAt: any,
  id : number,
  title : string,
}

export interface pantryItem {
    category: string,
    createdAt: any,
    expiryDate: string,
    id: number,
    itemName: string,
    quantity: number
}

@Injectable({
  providedIn: 'root'
})

export class GrocerService {
  updatePantry(originalPantryItems: Map<string,pantryItem>, pantryItems: pantryItem[]) {
    pantryItems.forEach((item) =>{

      let originalItem = originalPantryItems.get(item.itemName)

      if(originalItem?.quantity != item.quantity){
        this.http.put(environment.apiUrl + "/api/pantry/"+item.id, 
          {
            itemName: item.itemName,
            quantity: item.quantity,
            category: item.category,
            expiryDate: item.expiryDate
          }
        ).subscribe()

      }
    })
  }
  getPantryItems(userId : string) {
    return this.http.get(environment.apiUrl+ "/api/pantry/user/" + userId)
  }



  submitList(name : string, ingredientList : ingredient[]){
    let body = {
      title : name,
      userId : this.authService.getUserID(),
      items: ingredientList
    }
    this.http.post(environment.apiUrl + "/api/lists/full",body).subscribe((res)=>{
      console.log(res)
    })

  }

  deleteList(id: number) {
    this.http.delete(environment.apiUrl + "/api/lists/"+id).subscribe((res)=>{
      console.log(res)
    })
  }

  getUserGroceryLists(){
    let currentUserID = this.authService.getUserID()
    
    return this.http.get(environment.apiUrl + "/api/lists/user/"+currentUserID)
  }


  getGroceryListItems(listId : string){

    return this.http.get(environment.apiUrl + "/api/items/list/"+listId)
  }

  getGroceryListName(listId : string){
    return this.http.get(environment.apiUrl + "/api/lists/"+listId)
  }

  addGroceryIngredient(listId: string, item: ingredient) {
    this.http.post(environment.apiUrl + "/api/items", {
      itemName: item.itemName,
      quantity: item.quantity,
      category: item.category,
      listId: listId
    }).subscribe(res => console.log(res))
  }

  editGroceryListName(listId: string, newName : string) {
    this.http.put(environment.apiUrl + "/api/lists/"+listId, {title : newName}).subscribe(res => console.log(res))
  }
  editGroceryIngredient(itemId: string, itemDetails : ingredient) {
    this.http.put(environment.apiUrl + "/api/items/"+itemId, {
      itemName: itemDetails.itemName,
      quantity: itemDetails.quantity,
      category: itemDetails.category ? itemDetails.category : ''
    }).subscribe(res => console.log(res))
  }

  deleteGroceryIngredient(id: string) {
    this.http.delete(environment.apiUrl + "/api/items/"+id).subscribe(res => console.log(res))
  }  

  constructor(private http : HttpClient, private authService : AuthService ) {
    
  }
}
