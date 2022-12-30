import { Component, EventEmitter, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
 
 id:number;  

  constructor(private recipeService:RecipeServiceService, private route:ActivatedRoute,private router:Router) { }

 
  ngOnInit(): void {
   

    this.route.params.subscribe(
      (params:Params) => {this.id = +params['id']; this.recipe = this.recipeService.getRecipe(this.id)}
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredinetsToShoppingList(this.recipe.ingredients)
  }

  onEdit(){
      this.router.navigate(['edit'],{relativeTo: this.route})
  }

  onShoppingList(){
    this.router.navigate(['shopping-list'],{relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
  }

}
