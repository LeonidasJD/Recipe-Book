import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.css']
})
export class WelcomeMessageComponent implements OnInit {

  constructor(private authService:AuthService) { }

  userEmail:string ;

  ngOnInit(): void {

    this.authService.sendUser.subscribe(user =>{
      this.userEmail = user.email;
    })
  }

}
