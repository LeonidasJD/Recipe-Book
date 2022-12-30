import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "../alert/alert.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        ForgotPasswordComponent,
    ],
    imports:[BrowserModule,FormsModule,RouterModule,HttpClientModule,],
    
    exports:[
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        ForgotPasswordComponent,
    ]
})
export class AuthModule{

}