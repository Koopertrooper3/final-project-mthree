import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
const apiUrl = environment.apiUrl

export interface LoginObject{
  email: string,
  password: string
}

export interface RegisterObject{
  email: string,
  password: string,
  name: string
}

interface LoginResponse{
  message: string,
  userId: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http : HttpClient, private router : Router) {
    
  }


  setUserID(userId : number){
    localStorage.setItem('userId', userId.toString())
  }

  getUserID(){
    return localStorage.getItem('userId')
  }
  
  loginAttempt(login : LoginObject){
    return this.http.post(environment.apiUrl + "/api/auth/login",login)
    .subscribe((res) =>{

      let resBody : LoginResponse = res as LoginResponse
      if(resBody.message !== "Login successful"){
        console.log(resBody.message)
      }else{

        this.setUserID(resBody.userId)        
        this.router.navigateByUrl("/dashboard")
      }
    })
  }

  registerAttempt(register : RegisterObject){
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
