import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrocerService, groceryList, ingredient } from '../grocer.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';


interface deepIngredient {
    id: string,
    itemName: string,
    quantity: number,
    category: string
}

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
  oldDeepGroceryList = new Map<string,deepIngredient>();
  listId = "";
  formerListName: string = "";

  ingredientForm: FormGroup = new FormGroup({
    listName: new FormControl("",
      [
        Validators.required
      ]
    ),
    ingredientName: new FormControl(""),
    ingredientTag: new FormControl("")
  });

  constructor(private grocer : GrocerService, private route : ActivatedRoute, private router : Router){

    this.listId = this.route.snapshot.paramMap.get('id')!;
    if(this.listId == null){
      throw new Error("No listId")
    }

    this.grocer.getGroceryListItems(this.listId).subscribe((res) =>{

      let ingredients = res as any[]
      ingredients.forEach( (ingredient) =>{
        this.groceryList.push(
          {
            itemName: ingredient.itemName,
            quantity: ingredient.quantity,
            category: ingredient.category ? ingredient.category : ""
          }
        )

        this.oldDeepGroceryList.set( ingredient.itemName,
          {
            id: ingredient.id,
            itemName: ingredient.itemName,
            quantity: ingredient.quantity,
            category: ingredient.category ? ingredient.category : ""
          }
        )

        this.oldDeepGroceryList.set
      })

      
    })

    this.grocer.getGroceryListName(this.listId).subscribe((res) =>{

      if( (res as groceryList).title == null){
        throw new Error("List does not exist")
      }else{
          this.ingredientForm.setValue({
            listName : (res as groceryList).title,
            ingredientName : "",
            ingredientTag : ""
        })
      }

      this.formerListName = (res as groceryList).title
      
    })

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
    console.log("edit submit works")
    
    //Edit name if name changed

    if(this.listName.value !== this.formerListName){
      console.log("Edit list name")
      this.grocer.editGroceryListName(this.listId, this.listName.value)
    }
    //Edit items if item changed
    for(const item of this.groceryList){
      
    }

    this.groceryList.forEach((item) =>{
      let cleanItem = this.oldDeepGroceryList.get(item.itemName)
      let newItem = cleanItem == null
      if(newItem){
        //create new item
        console.log("New Item")
        this.grocer.addGroceryIngredient(this.listId!, item)
      }else{
        if(item.itemName != cleanItem?.itemName || item.quantity != cleanItem.quantity || item.category != cleanItem.category){
          let itemId = cleanItem?.id

          this.grocer.editGroceryIngredient(itemId!, item)
        }

        this.oldDeepGroceryList.delete(item.itemName)
        }
      

    })

    console.log(this.oldDeepGroceryList)
    //Delete items if items removed
    this.oldDeepGroceryList.forEach((deletedItems) =>{
      //Delete items
      this.grocer.deleteGroceryIngredient(deletedItems.id)
    })
    
    //this.grocer.editGroceryListName(this.listId, this.listName.value,this.groceryList)
    //this.grocer.editGroceryListItems(this.listId)
    this.router.navigateByUrl("/dashboard")
  }
}
