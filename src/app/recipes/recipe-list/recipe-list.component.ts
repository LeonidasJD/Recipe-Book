import { Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 

  recipes: Recipe[] = [];

@Input() id:number;

name:string;

userExists = false;


word:string;



  constructor(public recipeService:RecipeServiceService, private router:Router, private route: ActivatedRoute, private authService:AuthService,private dataStorageService:DataStorageService) {}

 

  ngOnInit(): void {
    
    this.recipeService.onSendWord.subscribe(searchWord => this.word = searchWord); //sunscribe na tekst iz search bara koji predstavalja trazenu rec u pretrazi 
   
   
    this.recipeService.sendRecipe.subscribe(newRecipes => {this.recipes = newRecipes})
    //this.recipes = this.recipeService.getRecipes();

    this.authService.sendUser.subscribe(user => {
      if(user){
        this.userExists = true;  // sluzi da bi nam ispisao komponentu welcome message ,ukoliko user postoji
      }
    })


    
    
  }
  onNewRecipe(){
      this.router.navigate(['new'], {relativeTo: this.route})
  }

  onSelectExistingRecipes(){
    this.dataStorageService.onFetchRecipes().subscribe(responseFetch =>{this.recipeService.overWriteRecipes(responseFetch)});  

    /* kada se klikne na dugme Select Existing Recipes
     povlaci sve recepte iz baze i ispisuje ih , isto sto radi i dugme Fetch data i link Recipes*/
  }


  
      

}
