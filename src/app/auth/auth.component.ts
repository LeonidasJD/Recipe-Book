import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user-model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router, ) { }

  @ViewChild('authForm') authForm:NgForm

  logInMode = false;
  

  ngOnInit(): void {

  }

 


  onSwitchLogin(){
    this.logInMode = !this.logInMode
  }

  onSubmitForm(form:NgForm){

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    if(this.logInMode == false){

      this.authService.signUp(username,email,password);
    }
    
    else{
      this.authService.logIn(email,password);
      
    }
    form.reset();
    
    
    } 

  }

