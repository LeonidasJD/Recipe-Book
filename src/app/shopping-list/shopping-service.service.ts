
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient-model';

export class ShoppingServiceService {

  startedEditing = new Subject<number>();

   ingredients: Ingredient[] = [
    
  ];

  constructor() { }

  onAddedIngredient(ingredient: Ingredient){
    this.ingredients.push({name:ingredient.name,amount:ingredient.amount});
   }

   getIngredients(){
    return this.ingredients
   }

   ondDeleteIngredients(){
    this.ingredients.length = 0;
   }

   clearIngredient(iterationNumber:number){
    this.ingredients.splice(iterationNumber,1);
   }

   addIngredients(ingredients1: Ingredient[]){
      this.ingredients.push(...ingredients1);
      
   }

   getIngredient(index:number){
      return this.ingredients[index];
   }
 
 updateIngredient(index:number, newIngredient:Ingredient){
   this.ingredients[index] = newIngredient;
   this.ingredients.slice()

 }
}
