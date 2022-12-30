import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ShoppingConfirmComponent } from "./shopping-confirm/shopping-confirm.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ShoppingConfirmComponent,
],
imports:[BrowserModule,FormsModule,RouterModule,HttpClientModule,],
exports:[
    ShoppingListComponent,
    ShoppingEditComponent,
],
})

export class ShoppingListModule{

}
