import { Component, OnInit } from '@angular/core';
import{ freeApiService } from './services/freeapi.services';
import{ UrlService } from './services/UrlService';
import { databind } from './services/databind';
import {LocalStorageService} from 'ngx-webstorage';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';


@Component({
   selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  session: boolean = false;
  cookieName : string = 'Permission';
  constructor(private router: Router,private userservice: UserService,private urlSevice: UrlService,private sharedService: databind, private localStorage : LocalStorageService){
    
  }
  
  async ngOnInit(){
    
    if (!(this.localStorage.retrieve('currentUser')!=null && this.localStorage.retrieve('currentUser')!=undefined )){
      this.session = true;
      console.log(this.localStorage.retrieve('currentUser'))
      this.router.navigate(['/create-user']);

    }else{
      this.session = false;
      this.router.navigate(['/sign-in']);

    }
    this.userservice.watchStorage().subscribe((data: string) => {
    if (data=="session expired")
    {
      this.router.navigate(['/sign-in']);

      this.session = false;
      this.localStorage.clear();

    }else if (data=="session started"){
      this.session = true;
    }
    });

    /*  if (!this.cookieService.check(this.cookieName))
       await this.urlSevice.geturl().then(value=>{ console.log(value), this.cookieService.set(this.cookieName,JSON.stringify(value))});
 
       this.sharedService.Urls = JSON.parse(this.cookieService.get(this.cookieName));

    console.log('lol',this.sharedService.Urls);
  }
*/

  this.urlSevice.geturl().then(res=>{
    console.log(res)
    console.log(this.localStorage.retrieve("permissios"));
  }).catch(err=>{
    console.log(err)
  });
  // this.localStorge.observe("permissios")
  // .subscribe((value) => console.log('new value', value))



}

logout(){
  this.userservice.storageSub.next("session expired");
  this.localStorage.clear();
  this.session = false;
  this.userservice.reset();
  this.userservice.stop();
}

}




