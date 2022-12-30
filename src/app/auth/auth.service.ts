import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user-model';




interface AuthResponseSignup {

idToken: string;
email: string;
refreshToken: string;
expiresIn: string;
localId: string;
}

interface AuthResponseLogIn{
idToken: string;
email: string;
refreshToken: string;
expiresIn: string;
localId: string;
registered: boolean;
}

interface ForgotPasswordResponse{
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sendUser = new BehaviorSubject<User>(null); // null jeste podrazumevana vrednost usera sto znaci da po difoltu user ne postoji dok ga ne kreiramo
  sendEmail = new BehaviorSubject<string>(null) // saljemo email koji zelimo da izmenimo

  
  loadingSpinner = false;
  isError:string = null;
  isSuccess:string = null;

  isAuthenticated = false;

  requestType:string; //za forgot password

  
  constructor(private http:HttpClient, private router:Router) { }


signUp(username:string,email:string,password: string){

  this.loadingSpinner = true;
  return this.http.post<AuthResponseSignup>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsbKRPyqQZ7mAxEhCFeNa78CsspDKK1rI',
  {
    username:username,
    email:email,
    password:password,
    returnSecureToken:true

  }).subscribe(
    responseData =>{console.log(responseData);       // ispisvanje podataka na koje smo se prijavili nakon izvrsavanje signUp , u konzoli 
                    if(this.isError == null){         // hendlovanje greske ukoliko ne postoji nikakva greska ispisace se poruka da je registrovanje uspesno
                      this.isSuccess = 'Sign Up Success, please LogIn !';
                    }
                        //nakon uspesnog resgistrovanja spiner ce nestati 

                    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);    // pretvaranje expirationDate u sekunde jer je po difoltu string

                    const user = new User(     //nakon registrovanja korisnika kreiramo User po modelu koji je napravljen u user-model.ts , user-model.ts je napravljen po modelu signUp dokumentacije
                      responseData.email,
                      responseData.localId,
                      responseData.idToken,
                      expirationDate);

                      this.sendUser.next(user);
                      localStorage.setItem('userData', JSON.stringify(user)) // sluzi da se kreira local storage sa informacijama o useru kako bi se izvrsio autoLogin i pri osvezavanju stranice ne dolazi do odjavljivanja

                   

                    this.loadingSpinner = false;
                  },

    errorResponse =>{console.log(errorResponse);
             this.loadingSpinner = false;
            switch(errorResponse.error.error.message){
              case 'EMAIL_EXISTS': this.isError = 'Email already exists !' // proveramo da li je poruka greske EMAIL_EXISTS ako jeste ispisuje se greska
              break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this accou…setting your password or you can try again later.': this.isError = 'Too many attempts ,try later !'
            }
            });
}

logIn(email:string,password:string){
  this.loadingSpinner = true;
return this.http.post<AuthResponseLogIn>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsbKRPyqQZ7mAxEhCFeNa78CsspDKK1rI',
  {
  email:email,
  password:password,
  returnSecureToken:true
  }

  ).subscribe(
    responseLogInData => {console.log(responseLogInData); 
                        
                      const expirationDate = new Date(new Date().getTime() + +responseLogInData.expiresIn * 1000);

                      const user = new User(
                      responseLogInData.email,
                      responseLogInData.localId,
                      responseLogInData.idToken,
                      expirationDate);

                      this.sendUser.next(user);

                      localStorage.setItem('userData', JSON.stringify(user)); //pretvaramo objekat user u string metodom stringify() i postavljamo local storage

                     

                      
                      this.loadingSpinner = false;
                      

                      this.router.navigate(['recipes']);
                        },

    errorResponse =>{console.log(errorResponse);
                    this.loadingSpinner = false;

                    switch(errorResponse.error.error.message){
                      case 'EMAIL_NOT_FOUND' : this.isError = 'Email is invalid !';
                      break;
                      case 'INVALID_PASSWORD' : this.isError = 'Invalid Password !';
                      break;
                      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this accou…setting your password or you can try again later.' : this.isError = 'Too many attempts ,try later !'
                      break;
                    }
                    },           
  )
}

logOut(){
  if (confirm('Are you sure you want to log out ?')) {
  
    this.sendUser.next(null);
    localStorage.removeItem('userData');
    console.log('Logged out!');

    this.router.navigate(['/auth']);
  } 
  

}

autoLogIn(){    // kada resetujemo aplikaciju izvrsava se ova metoda koja ne dozvoljava da se korisnik izloguje ssvakim osvezavanjem stranice 
  
const storedUserData = JSON.parse(localStorage.getItem('userData')); //vracamo user na tip objekat i preuzimamo vrednosti skladistenog usera 

const loadedUser = new User(storedUserData.email,storedUserData.id,storedUserData._token,new Date(storedUserData._tokenExpirationDate));

if(loadedUser.token){
  this.sendUser.next(loadedUser);
}

}

closeErrorWindow(){
  this.isError = null;   // izvrsava se kada kliknemo na close dugme kada nam iskoci prozor ukoliko je losa sifra ili email
}

onForgotPassword(email:string){
  this.http.post<ForgotPasswordResponse>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBsbKRPyqQZ7mAxEhCFeNa78CsspDKK1rI',
  {email:email,
  requestType: "PASSWORD_RESET"},).subscribe(    //izvrsava se metoda kada hocemo da promenimo lozinku ,pa posaljemo mejl na kome nam se nalazi nalog
  
    forgotResponse => {
      this.sendEmail.next(forgotResponse.email);
    console.log(forgotResponse);
  },
  forgotErrorResponse =>{
    switch(forgotErrorResponse.error.error.message){
      case 'EMAIL_NOT_FOUND' : this.isError = 'This email is not found !'
    }
    
  })
}


}
