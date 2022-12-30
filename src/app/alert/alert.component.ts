import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

onClose(){
  this.authService.closeErrorWindow();
}



}
