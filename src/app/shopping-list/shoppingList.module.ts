import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
],
imports:[BrowserModule,FormsModule,RouterModule,HttpClientModule,],
exports:[
    ShoppingListComponent,
    ShoppingEditComponent,
],
})

export class ShoppingListModule{

}