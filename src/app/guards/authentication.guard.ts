import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from 'src/app/services/Login/login-service.service';
import { nextTick } from 'q';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate  {
  constructor( private router:Router, private loginValidationService: LoginService){} 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   //const currentUser = this.loginValidationService.currentUser;
   console.log(this.loginValidationService.isLoggedIn);
    if (this.loginValidationService.isLoggedIn) {
      return true;
    }

    //navigate to login page because the user is not logged in yet
    this.router.navigate(['/login']);
    return;
  }
  
}
