import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingServiceService } from './shopping-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations:[
    trigger('listState',[
      state('normal',style({'opacity':'1',transform:'translateX(0)'})),
      transition('void => normal',[style({'opacity':'0',transform:'translateX(-100px)'}),animate(300)])
    ])
  ]
})
export class ShoppingListComponent implements OnInit {

  normalState = 'normal'; //state za animaciju

  ingredients: Ingredient[] = [];
  @Input() id:number;
  

  constructor(private shoppingService:ShoppingServiceService) {
  
  }

  onClear(){
    this.shoppingService.clearIngredient(this.id);
  };


  ngOnInit(){
    this.ingredients = this.shoppingService.getIngredients();
    
  }

 onEditItem(index:number){
  this.shoppingService.startedEditing.next(index);
 }

}
