import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../environments/environment';
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

  constructor(private http : HttpClient) {
    
   }


  loginAttempt(login : loginObject){
    return this.http.post(environment.apiUrl + "/api/auth/login",login,{responseType: 'text'})
  }

  registerAttempt(register : registerObject){
    return this.http.post(environment.apiUrl + "/api/auth/register",register,{responseType: 'text'})
  }
}
