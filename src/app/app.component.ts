import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './route-animations.spec';
import { ApiPermissionsService } from './api-permissions.service';
import { CookieService } from 'ngx-cookie-service';
import { SiblingCommunicatorService } from './sibling-communicator.service';
import { Permission_URL } from './Permission_URL';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})


export class AppComponent {
  title = 'AngularApp';
  cookieName : string = 'Permission_Url';
  constructor(private urlSevice: ApiPermissionsService, private cookieService: CookieService,private sharedService: SiblingCommunicatorService){
    
  }
  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['state'];
  }
  async ngOnInit(){
   if (!this.cookieService.check(this.cookieName))
       await this.urlSevice.GetUrls().then(value=>{ console.log(value), this.cookieService.set(this.cookieName,JSON.stringify(value))});
 
       this.sharedService.Urls = JSON.parse(this.cookieService.get(this.cookieName));
  }


}
