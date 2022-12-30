import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService:AuthService) { }

  emailSent = false;

  ngOnInit(): void {
  }

  onSubmitForm(form:NgForm){
    const email =  form.value.email;

    this.authService.onForgotPassword(email);
    form.reset();
    
    this.authService.sendEmail.subscribe(email => {
      if(email){
        this.emailSent = true;
      }
    })
    
    
    
  }

}
