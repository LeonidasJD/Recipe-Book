import { formatCurrency } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingServiceService } from '../shopping-service.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

   
  constructor(private shoppingService:ShoppingServiceService, private router:Router,private route:ActivatedRoute)  { }
 
  @ViewChild('f') shoppingListForm:NgForm;

  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  newIngredient:Ingredient;
  
  subscription:Subscription;
   
  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{this.shoppingService.onAddedIngredient(newIngredient);}
    this.editMode = false;
  form.reset();
  } 

   onDelete(){
    this.shoppingService.ondDeleteIngredients();
   }

   
  

  ngOnInit(): void {

    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClearFormValue(){
    this.shoppingListForm.reset();
  }

  
 

}
