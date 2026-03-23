
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterObject } from '../auth.service';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule
],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl("",
      [
        Validators.required,
        Validators.email
      ]
    ),
    firstPassword: new FormControl("",
      [
        Validators.required,
      
      ]
    ),
    secondPassword: new FormControl("",
      [
        Validators.required,
      ]
    ),
    name: new FormControl("",
      [
        Validators.required
      ]
    )
  })


  constructor(private auth : AuthService, private router : Router){}
  
  get name() {
    return this.registerForm.get('name');
  }
  
  get email() {
    return this.registerForm.get('email');
  }

  get firstPassword() {
    return this.registerForm.get('firstPassword');
  }

  get secondPassword() {
    return this.registerForm.get('secondPassword');
  }

  checkSecondPassword(form : FormGroup): ValidatorFn {
    return (control : AbstractControl): ValidationErrors | null =>{
      return form.get('firstPassword')?.value === control.value ? null : { passwordMismatch: true };
    } 
  }

  onRegister(){
    if(!this.name || !this.email || !this.secondPassword){
      throw new Error("Fields do not exist (null guard)")
    }

    let registerInfo : RegisterObject = {name: this.name.value,email: this.email.value, password: this.secondPassword.value}
    this.auth.registerAttempt(registerInfo)
    
  }
}
