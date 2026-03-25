import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';

export interface ingredient{
  itemName: String
  quantity: number
  tag: String
}
export interface groceryList{
  createdAt: any,
  id : number,
  title : string,
}
interface groceryListRequest{
  groceryListName : string,
  ingredients : ingredient[]
  
}

@Injectable({
  providedIn: 'root'
})
export class GrocerService {
  
  constructor(private http : HttpClient, private authService : AuthService ) {
    
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

  

}
