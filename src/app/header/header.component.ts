
import { Component,OnInit  } from "@angular/core";
import { Route, Router } from "@angular/router";
import { ignoreElements } from "rxjs";
import { AuthComponent } from "../auth/auth.component";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user-model";
import { RecipeServiceService } from "../recipes/recipe-service.service";
import { DataStorageService } from "../shared/data-storage.service";




@Component({
    selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

constructor( private dataStorageService:DataStorageService, private recipeService:RecipeServiceService, private router:Router, private authService:AuthService){}



isAuthenticated = false;



ngOnInit(){

this.dataStorageService.onFetchRecipes().subscribe(responseFetch =>{this.recipeService.overWriteRecipes(responseFetch), console.log(responseFetch)}); 

  this.authService.sendUser.subscribe(user =>{
   this.isAuthenticated = user ? true : false;
  
  })
}

onSaveAtDataBase(){
  this.dataStorageService.onStoreRecipes().subscribe(responseRecipes =>{console.log(responseRecipes)});
  alert('Your recipe has been saved')
  
}

onFetchData(){

  this.dataStorageService.onFetchRecipes().subscribe(responseFetch =>{ this.recipeService.overWriteRecipes(responseFetch), console.log(responseFetch)});
}

showRecipes(){
  this.dataStorageService.onFetchRecipes().subscribe(responseFetch =>{this.recipeService.overWriteRecipes(responseFetch), console.log(responseFetch)});
} // kada kliknemo na recipes link da odmah izvrsi ucitavanje recepata iz baze

onLogOut(){
this.authService.logOut();

}
saveAllChanges(){
  this.dataStorageService.onStoreRecipes().subscribe();
  console.log('Recipe Deleted') //ova metoda salje sve recepte u bazu ,kreirano sa namerom da kada se neki recept obrise ,da se sacuvaju promene
  alert('All changes are saved !')
}
}
