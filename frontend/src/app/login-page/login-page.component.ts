import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, loginObject } from '../auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    emailControl: new FormControl("",
      [
        Validators.required,
        Validators.email
      ]
    ),
    passwordControl: new FormControl("",
      [Validators.required]
    )
  })

  constructor(private auth : AuthService){}

  get emailField() {
    return this.loginForm.get('emailControl');
  }

  get passwordField() {
    return this.loginForm.get('passwordControl');
  }

  onSubmit(){
    console.warn(this.loginForm.value);
    console.warn(this.loginForm.errors);

    let passwordField = this.loginForm.get('passwordControl');
    let emailField = this.loginForm.get('emailControl')


    if(!emailField || !passwordField || !emailField.value || !passwordField.value){
      throw new Error("Fields do not exist (null guard)")
    }

    if(emailField.errors || passwordField.errors){
      throw new Error("Error in fields")
    }

    let login : loginObject = {email: emailField.value, password: passwordField.value}
    this.auth.loginAttempt(login)
  }
}
