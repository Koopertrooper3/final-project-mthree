import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrocerService, groceryList, ingredient } from '../grocer.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Params } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  imports: [
  NavbarComponent,
  ReactiveFormsModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent {

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

  constructor(private grocer : GrocerService, private route : ActivatedRoute){

    let listId = this.route.snapshot.paramMap.get('id');
    if(listId == null){
      throw new Error("No listId")
    }

    this.grocer.getGroceryListItems(listId).subscribe((res) =>{
      console.log(res)

      let ingredients = res as any[]
      ingredients.forEach( (ingredient) =>{
        this.groceryList.push(
          {
            itemName: ingredient.itemName,
            quantity: ingredient.quantity,
            tag: ingredient.category ? ingredient.category : ""
          }
        )
      })
    })

    this.grocer.getGroceryListName(listId).subscribe((res) =>{

      if( (res as groceryList).title == null){
        throw new Error("List does not exist")
      }else{
          this.ingredientForm.setValue({
            listName : (res as groceryList).title,
            ingredientName : "",
            ingredientTag : ""
        })
      }
      
    })

  }

  removeTag(index : number){
    this.currentIngredientTags.splice(index,1)
  }

  removeTagFromIngredient(ingredientIndex :number){
    this.groceryList[ingredientIndex].tag = '';
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
          quantity: 0,
          tag: this.currentIngredientTags.length > 0 ? this.currentIngredientTags[0] : ''
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
    console.log("submit works")
    console.log(this.groceryList)
    console.log(this.listName.value)
    this.grocer.submitList(this.listName.value,this.groceryList)
  }
}
