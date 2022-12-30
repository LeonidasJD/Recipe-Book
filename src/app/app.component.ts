import { Component, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RecipeServiceService } from './recipes/recipe-service.service';
import { DataStorageService } from './shared/data-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'recipe-app';
  
constructor(private authService:AuthService){}

  ngOnInit() {
this.authService.autoLogIn();  //metoda autoLogin se izvrsava kako se korisnik ne bi izlogovao kada se refresuje stranica 



  }
  }

  

