import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private Authservice:AuthGuardService,private router:Router) { }

  ngOnInit() {
  }

  
  OnSubmit(userName,password){
    this.Authservice.userAuthentication(userName,password).subscribe((data : any)=>{

      console.log(data.token);
      localStorage.setItem('jwt',data.token)
      this.Authservice.storageSub.next("jwt added");
      this.router.navigate(["display-user"]);
   });
 }

}
