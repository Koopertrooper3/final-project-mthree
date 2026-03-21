import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
const apiUrl = environment.apiUrl

export interface loginObject{
  email: string,
  password: string
}

export interface registerObject{
  email: string,
  password: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userID = "1";

  constructor(private http : HttpClient, private router : Router) {
    
  }

  
  public set userId(v : string) {
    this.userID = v;
  }
  
  loginAttempt(login : loginObject){
    return this.http.post(environment.apiUrl + "/api/auth/login",login,{responseType: 'text'})
  }

  registerAttempt(register : registerObject){
    return this.http.post(environment.apiUrl + "/api/auth/register",register,{responseType: 'text'})
    .subscribe((res) =>{
      if(res === "Email already exists"){
        console.log("Email already exists")
      }else{

        //this.userID = res
        this.router.navigateByUrl("/login")
      }
    })
  }
}
