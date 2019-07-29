import { Component, OnInit } from '@angular/core';
import { LoginInfo, ResponseCheck } from '../../models/login-info';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { Router } from '@angular/router';
import { SiblingCommunicatorService } from 'src/app/services/sibling-communicator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  CheckValue: boolean = false;
  User : LoginInfo = new LoginInfo;
  EmailFound: boolean ; //Was used for checking email in db
  constructor(private router: Router,private loginService: SessionManagerService,private sharedService: SiblingCommunicatorService) { }

  async onSubmit(email: string,pass: string){
    console.log('Values:',email,pass);
    this.User.email=email;
    this.User.password=pass;
   
    if (await this.loginService.Login(this.User,this.CheckValue)){
     this.router.navigateByUrl('/defaultpage');
     this.sharedService.StartTimer();
     
    }else{
      
      var Button= document.getElementById("openModalButton");
      Button.click();
    }
  
  }
  async checkEmail(){
    console.log('Checking Email');
   // this.EmailFound=await this.loginService.CheckEmail(this.User);
  }
  onRemember(){
    //console.log("Getting Local Pass");
     //  this.User.email="saad18910@hotmail.com";
    this.User = this.loginService.GetFromLocalStorage();
    if (this.User.email != "")
      this.CheckValue=true;
  }

  ngOnInit() {
 
    this.onRemember();
  }

}
