import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private isLoggedIn:boolean;
  constructor(private _loginServive: LoginService, private router: Router) { 
    this.isLoggedIn = false;
  }
   ngOnInit() {
   }
   onClickSubmit(formData) {
     (this._loginServive.validateLogin(formData.username, formData.pwd).subscribe((data)=>{
      console.log('response result',data);
      this.isLoggedIn = data;
      if (this.isLoggedIn) {
        this.router.navigate(['/home']);
      } else {
        
        alert("Username or Password is incorrect!");
        
      }
    }));
  
   }
}
