import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeServiceService } from '../recipes/recipe-service.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeServiceService, private authService:AuthService) { }

  

onStoreRecipes(){

const recipes = this.recipeService.getRecipes();

return this.authService.sendUser.pipe(take(1),exhaustMap(user =>{
  return this.http.put('https://recipe-book-database-7ec2d-default-rtdb.europe-west1.firebasedatabase.app/recipe.json?auth=' + user.token,recipes);
}))


}


onFetchRecipes(){
  return this.authService.sendUser.pipe(take(1),exhaustMap(user => {          //pipe(take(1)) podrazumeva da smo preuzeli jednog usera i nakon toga izvrsili unsubscribe, ako ne ubacimo pipe mozemo i da unutar onDestroy kreiramo samo unsubscribe i to je to
              
  return this.http.get<Recipe[]>('https://recipe-book-database-7ec2d-default-rtdb.europe-west1.firebasedatabase.app/recipe.json?auth=' + user.token)
  }),(map(responseData=>{
    const postsArray = [];                      
    for(let key in responseData){
      if(responseData.hasOwnProperty(key)){
        postsArray.push({...responseData[key], id:key})
      }
    }
    return postsArray;
  })
  ));


  

}
}
