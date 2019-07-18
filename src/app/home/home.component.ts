import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service.service';
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
    this._loginServive.logout();
  }
}
