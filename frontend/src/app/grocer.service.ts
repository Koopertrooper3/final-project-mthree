import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';

export interface ingredient{
  name: String
  tags: String[]
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

  }

  getUserGroceryLists(){
    let currentUserID = this.authService.userID
    //let currentUserID = 1;
    
    return this.http.get(environment.apiUrl + "/api/lists/user/"+currentUserID)
  }
  
  // loginAttempt(login : loginObject){
  //   return this.http.post(environment.apiUrl + "/api/auth/login",login,{responseType: 'text'})
  // }

  // registerAttempt(register : registerObject){
  //   return this.http.post(environment.apiUrl + "/api/auth/register",register,{responseType: 'text'})
  //   .subscribe((res) =>{
  //     if(res === "Email already exists"){
  //       console.log("Email already exists")
  //     }else{

  //       //this.userID = res
  //       this.router.navigateByUrl("/login")
  //     }
  //   })
  // }


}
