import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _loginServive: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    console.log("Logging out fom Login component");
    this._loginServive.logout();
  }
}
