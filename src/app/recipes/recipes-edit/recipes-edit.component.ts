import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  constructor(private route:ActivatedRoute, private recipeService:RecipeServiceService, private router:Router,public dataStorageService:DataStorageService) { }

  id:number;
  editMode = false;
  recipe:Recipe;

  recipeForm:FormGroup;

  ngOnInit(): void {

    this.route.params.subscribe(
    (params:Params) => {this.id = +params['id'];
    this.editMode = params['id'] != null; //mozemo postaviti samo this.editMode = true;    i sve ce raditi identicno
    this.initForm();
  }
    )
}

initForm(){

let recipeName = '';
let recipeImagePath = '';
let recipeDescription = '';
let recipeIngredients= new FormArray([]);

if(this.editMode){
 const recipe = this.recipeService.getRecipe(this.id);
  recipeName = recipe.name;
  recipeImagePath = recipe.imagePath;
  recipeDescription = recipe.description;

for (let ingredient of recipe.ingredients){
    recipeIngredients.push(new FormGroup({
      'name':new FormControl(ingredient.name,Validators.required),
      'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern("^[1-9]+[0-9]*$")])    //ubacivanje sastojaka unutar template za edit recepta
      }))
    }
  }



this.recipeForm = new FormGroup({
  'name': new FormControl(recipeName,Validators.required),
  'imagePath': new FormControl(recipeImagePath,Validators.required),
  'description': new FormControl(recipeDescription,Validators.required),
  'ingredients': recipeIngredients,


});
}




onSubmit(){

const newRecipe = new Recipe(
this.recipeForm.value['name'],
this.recipeForm.value['description'],
this.recipeForm.value['imagePath'],
this.recipeForm.value['ingredients'],
this.recipeForm.value['howToPrepare'],
this.recipeForm.value['recipeType']);


if(this.editMode){
this.recipeService.updateRecipe(this.id,newRecipe);
this.dataStorageService.onStoreRecipes().subscribe(responseRecipe =>{console.log(responseRecipe)})


}else{
this.recipeService.addNewRecipe(newRecipe)
console.log(this.recipeForm.value['ingredients'])
this.dataStorageService.onStoreRecipes().subscribe(responseRecipe =>{console.log(responseRecipe)});
}
this.onCancel();
}

onCancel(){
this.router.navigate(['../'],{relativeTo:this.route}); // kada kliknemo cancel dugme
}



onAddFormArray(){            //metoda za dodvanje kontrole za upis sastojaka

(<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
  'name':new FormControl(null,Validators.required),
  'amount':new FormControl(null,[Validators.required,Validators.pattern("^[1-9]+[0-9]*$")])
}))
}

onDeleteFormArray(index:number){
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}

getControls(){
return (<FormArray>this.recipeForm.get('ingredients')).controls;
}

}


