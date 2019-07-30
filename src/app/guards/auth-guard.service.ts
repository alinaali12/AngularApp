import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import {  RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {
  constructor( private router:Router, private loginValidationService: UserService){} 
  canActivate(route:ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.loginValidationService.isLoggedIn) {
      return true;
    }

    //navigate to login page because the user is not logged in yet
    this.router.navigate(['/sign-in']);
    return;
  }
  } 

