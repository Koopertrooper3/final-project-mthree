import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ingredient, GrocerService } from '../grocer.service';


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
    ingredientName: new FormControl("",
      [
        Validators.required,
      ]
    ),
    ingredientTag: new FormControl("",)
  });

  removeTag(index : number){
    this.currentIngredientTags.splice(index,1)
  }

  removeTagFromIngredient(ingredientIndex :number, tagIndex :number){
    this.groceryList[ingredientIndex].tags.splice(tagIndex,1);
  }

  get ingredientName(){
    return this.ingredientForm.get('ingredientName');
  }

  get ingredientTag(){
    return this.ingredientForm.get('ingredientTag') as FormControl;
  }
  

  addIngredient(){
    if(this.ingredientName && this.ingredientName.value.length != 0){
      this.groceryList.push(
        {
          name: this.ingredientName?.value,
          tags: this.currentIngredientTags
        }
      )
      this.currentIngredientTags = []
      this.ingredientForm.reset(this.ingredientName)
      this.ingredientForm.reset(this.ingredientTag)

    }
    
  }
  addTag(){
    let newTag = this.ingredientTag.value
    this.currentIngredientTags.push(newTag)
    this.ingredientForm.reset(this.ingredientTag)
  }

  onSubmit(){
    console.log("submit works")
  }
}
