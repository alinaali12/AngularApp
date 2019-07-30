import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './models/route-animations.spec';
import { ApiPermissionsService } from './services/api-permissions.service';
import { CookieService } from 'ngx-cookie-service';
import { SiblingCommunicatorService } from './services/sibling-communicator.service';
import { SessionManagerService } from './services/session-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})


export class AppComponent {
  title = 'AngularApp';
  cookieName : string = 'Permission_Url';
 

  constructor(private router: Router,private urlSevice: ApiPermissionsService, private cookieService: CookieService,private sharedService: SiblingCommunicatorService,private loginService: SessionManagerService){
    
  }
  prepareRoute(outlet: RouterOutlet, ){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['state'];
  }

  async ngOnInit(){
    if (!this.cookieService.check(this.cookieName))
        await this.urlSevice.GetUrls().then(value=>{ console.log(value), this.cookieService.set(this.cookieName,JSON.stringify(value))});
    this.sharedService.Urls = JSON.parse(this.cookieService.get(this.cookieName));  
  }

  LogOut(){ 
    this.loginService.Logout();
    this.sharedService.LoggedIn=false;
    this.router.navigateByUrl('/loginpage');
  }


}
