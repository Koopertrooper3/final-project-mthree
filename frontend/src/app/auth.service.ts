import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface loginObject{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) {
    
   }


  loginAttempt(login : loginObject){
    //this.http.post()
  }

  registerAttempt(){
    //this.http.post().
  }
}
