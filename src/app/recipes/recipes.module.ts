import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FilterPipe } from "../filter.pipe";
import { DropdownDeclarationDirective } from "../shared/dropdown-declaration.directive";
import { WelcomeMessageComponent } from "../welcome-message/welcome-message.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesComponent } from "./recipes.component";


@NgModule({
declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipesEditComponent,
    DropdownDeclarationDirective,
    WelcomeMessageComponent,
    FilterPipe,
    
    
],

imports:[RouterModule,FormsModule,BrowserModule,ReactiveFormsModule, HttpClientModule],

exports:[
    RecipesComponent,     // exportovali smo sve komponente , i importovali ih ponovo u app.module jer se moraju nalaziti tamo
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipesEditComponent,
    DropdownDeclarationDirective,
    WelcomeMessageComponent,
    FilterPipe,
   
    
]

})
export class RecipesModule{


}