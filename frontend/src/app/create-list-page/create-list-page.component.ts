import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ingredient, GrocerService } from '../grocer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-list-page',
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-list-page.component.html',
  styleUrl: './create-list-page.component.css'
})

export class CreateListPageComponent {

  currentIngredientTags : string[] = []
  groceryList : ingredient[] = []
  
  ingredientForm: FormGroup = new FormGroup({
    listName: new FormControl("",
      [
        Validators.required
      ]
    ),
    ingredientName: new FormControl(""),
    ingredientTag: new FormControl("")
  });

  constructor(private grocer : GrocerService, private router : Router){

  }

  removeTag(index : number){
    this.currentIngredientTags.splice(index,1)
  }

  removeTagFromIngredient(ingredientIndex :number){
    this.groceryList[ingredientIndex].category = '';
  }

  removeIngredient(ingredientIndex: number) {
    this.groceryList.splice(ingredientIndex,1);
  }

  get listName(){
    return this.ingredientForm.get('listName') as FormControl
  }

  get ingredientName(){
    return this.ingredientForm.get('ingredientName') as FormControl;
  }

  get ingredientTag(){
    return this.ingredientForm.get('ingredientTag') as FormControl;
  }
  

  addIngredient(){
    if(this.ingredientName && this.ingredientName.value.length != 0){
      this.groceryList.push(
        {
          itemName: this.ingredientName?.value,
          quantity: 1,
          category: this.currentIngredientTags.length > 0 ? this.currentIngredientTags[0] : ''
        }
      )
      this.currentIngredientTags = []
      this.ingredientForm.reset({listName: this.listName.value, ingredientName: '',ingredientTag: ''})

    }
    
  }
  addTag(){
    
    let newTag = this.ingredientTag.value
    if(newTag.length > 0){
      this.currentIngredientTags.pop()
      this.currentIngredientTags.push(newTag)
    }
    this.ingredientTag.reset('',{onlySelf: true})
  }

  changeQuantity(event : Event, index : number){
    console.log(parseInt((event.target as HTMLInputElement).value))
    this.groceryList[index].quantity = parseInt((event.target as HTMLInputElement).value)
  }
  onSubmit(){

    this.grocer.submitList(this.listName.value,this.groceryList)

    this.router.navigateByUrl("/dashboard")
  }
}
