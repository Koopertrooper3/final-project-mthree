import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';


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


  userID = "1";

  constructor(private http : HttpClient, private router : Router) {
    
  }

  
  public set userId(v : string) {
    this.userID = v;
  }

  submitList(name : string, ingredientList : ingredient[]){

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
