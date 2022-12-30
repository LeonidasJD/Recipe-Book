import { Recipe} from "./recipe.model";
import { EventEmitter, Injectable}from '@angular/core'
import { Ingredient } from "../shared/ingredient-model";
import { ShoppingServiceService } from "../shopping-list/shopping-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";


@Injectable()
export class RecipeServiceService {

  constructor(private shoppingService:ShoppingServiceService, private router:Router,private route: ActivatedRoute,) {}

  private ingredients: Ingredient[]=[]

  sendRecipe = new Subject<Recipe[]>();

  onSendWord = new Subject<string>(); //slalje podatka iz search bara 

 // private recipes: Recipe[] = [
   // new Recipe(
    //'Pasta Carbonare', 
    //'Pasta sa belim mesom i pavlakom',
    //'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&webp=true&resize=300,272',
   // [new Ingredient('Fusili', 2)]),

   // new Recipe(
   //   'Cokoladna torta', 
   // 'Posna torta 750gr', 
    //'https://podravkaiovariations.azureedge.net/c1273bb2-6392-11eb-ae5a-0242ac120043/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp',
   // [new Ingredient('Cokolada', 300),
 // new Ingredient('Brasno' ,1)])
 // ];
 
 private recipes:Recipe[] = []


 overWriteRecipes(recipes:Recipe[]){
  this.recipes = recipes;
  this.sendRecipe.next(recipes);
  
 }

addNewRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    
}

deleteRecipe(id:number){
  if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS RECIPE ?')){
    this.recipes.splice(id,1);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  
 

}

updateRecipe(index:number,newRecipe:Recipe){
  this.recipes[index] = newRecipe;
  this.recipes.slice();
  
}

  getRecipes(){
    return this.recipes;
  }

  getRecipe(id:number){
    return this.recipes[id];
  }
  
  

  addIngredinetsToShoppingList(ingredient:Ingredient[]){
    this.shoppingService.addIngredients(ingredient);
  }
}
