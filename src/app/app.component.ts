import { Component, OnInit } from '@angular/core';
import{ freeApiService } from './services/freeapi.services';
import {CookieService} from 'ngx-cookie-service';
import{ UrlService } from './services/UrlService';
import { databind } from './services/databind';
import {LocalStorageService} from 'ngx-webstorage';


@Component({
   selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  cookieName : string = 'Permission';
  constructor(private urlSevice: UrlService, private cookieService: CookieService,private sharedService: databind, private localStorage : LocalStorageService){
    
  }
  
  async ngOnInit(){
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

}




