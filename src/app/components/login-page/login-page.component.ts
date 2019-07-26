import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../../models/login-info';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { Router } from '@angular/router';
import { SiblingCommunicatorService } from 'src/app/services/sibling-communicator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  CheckValue: boolean =false;
  User : LoginInfo = new LoginInfo;
  constructor(private router: Router,private loginService: SessionManagerService,private sharedService: SiblingCommunicatorService) { }

  async onSubmit(email: string,pass: string){
    console.log('Values:',email,pass);
    this.User.email=email;
    this.User.password=pass;
    console.log('CheckValue:',this.CheckValue);
    if (await this.loginService.Login(this.User,this.CheckValue)){
     this.router.navigateByUrl('/defaultpage');
     this.sharedService.LoggedIn=true;
     
    }else{
      
      var Button= document.getElementById("openModalButton");
      Button.click();
    }
  
  }
  onEmailChange(){
    let pass = this.loginService.GetFromLocalStorage(this.User.email);
    if (pass!=null){
       this.User.password=pass;
    }
  }
  ngOnInit() {
   // this.User.email="saad18910@hotmail.com";
  
  }

}
