import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _loginServive: LoginService) { }

  ngOnInit() {
  }

  
  logout(){
    console.log("Logging out fom navbar component");
    this._loginServive.logout();
  }
}
