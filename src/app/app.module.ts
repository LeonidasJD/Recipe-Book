import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
//import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
//import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
//import { DropdownDeclarationDirective } from './shared/dropdown-declaration.directive';
import { ShoppingServiceService } from './shopping-list/shopping-service.service';
import { RecipeServiceService } from './recipes/recipe-service.service';
import {  RouterModule, Routes } from '@angular/router';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import {  HttpClientModule } from '@angular/common/http';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
//import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthGuard } from './auth/auth-guard';
//import { AlertComponent } from './alert/alert.component';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shoppingList.module';
import { AuthModule } from './auth/authModule';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FilterPipe } from './filter.pipe';
import { ShoppingConfirmComponent } from './shopping-list/shopping-confirm/shopping-confirm.component';








const appRoutes: Routes = [
{path: '', redirectTo: 'recipes', pathMatch:'full'},

{path: 'recipes',   component:RecipesComponent, canActivate:[AuthGuard],
children:[{path:'new', component:RecipesEditComponent},
          {path:':id',component:RecipeDetailComponent,},
          {path:':id/edit',component:RecipesEditComponent},
          ]},

{path: 'shopping-list', component:ShoppingListComponent, canActivate:[AuthGuard],children:[{path:'confirmArticles',component:ShoppingConfirmComponent}]},
{path: 'recipes/:id/shopping-list', component:ShoppingListComponent},
{path:'auth',component:AuthComponent},
{path:'forgot-password',component:ForgotPasswordComponent}





]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,





    //RecipesComponent,    sve recipe komponente kao i welcome message komponenta  su prebacene u recipe module zbog optmizacije
    //RecipeListComponent,
    //RecipeDetailComponent,
    //RecipeItemComponent,
    //ShoppingListComponent,
    //ShoppingEditComponent,  sve shoppingList komponente su prebacene u shoppingList.module zbog optmizacije
    //DropdownDeclarationDirective,
   //RecipesEditComponent,
    //AuthComponent,
    //LoadingSpinnerComponent,
   // AlertComponent,  //AuthComponent , LoadingSpinnerComponent i ForgotPasswordComponent su deo auth modula
   // WelcomeMessageComponent,
    //ForgotPasswordComponent,




  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    RecipesModule, // importunate sve komponente iz recipe.modul
    ShoppingListModule,//importovane sve komponente iz shoppingList.modul
    AuthModule, //importovane sve komponente iz AuthModule
    BrowserAnimationsModule,





  ],
  providers: [ShoppingServiceService,RecipeServiceService,DataStorageService,AuthService,AuthComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
