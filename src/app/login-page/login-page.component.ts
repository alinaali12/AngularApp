import { Component, OnInit } from '@angular/core';
import {UserLogin} from '../shared/models/Login.model'
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  MyUser:UserLogin=new UserLogin();
  check="true";

  constructor(private _permservice:PermissionService,private router: Router,private cookie:CookieService,private _idservice:EditService) { }

  ngOnInit() {
    if(this.cookie.get("rememberedemail")!="null"){
      this.MyUser.email=this.cookie.get("rememberedemail");
      this.MyUser.password=this.cookie.get("remeberedpassword");
      console.log(this.MyUser.email,this.MyUser.password)
    }
    
  }
  async onSubmit(){
    await this._permservice.Match(this.MyUser).then(value=>{
      var access=value;
      console.log("access",access);
      if(access){
        this.cookie.set('token', "true", 0.5/24);
        console.log("if true",this.cookie.get('token'));
      }
      else{
        this.cookie.set('token', "false", 0.5/24);
      }
      
      
    });
    
    if(this.check=="true"){
      this.cookie.set("rememberedemail",this.MyUser.email,1);
      this.cookie.set("remeberedpassword",this.MyUser.password,1);
      console.log("stored");
    }
    else{
      this.cookie.set("rememberedemail",null,1);
      this.cookie.set("remeberedpassword",null,1);
    }
    this.router.navigateByUrl('table');
    this._idservice.count=1800;//30 minutes
    this.Counting();
    
    
  }
  Counting(){
    this._idservice.countDown = timer(0,1000).pipe(
      take(this._idservice.count),
      map(()=> --this._idservice.count)
   );
   if(this._idservice.countDown<=0){
     this.router.navigateByUrl('');
   }
  }
}
