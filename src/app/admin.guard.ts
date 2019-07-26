import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor() {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

    const islogin = localStorage.getItem('isLogin').toString();

    const isRemembered = localStorage.getItem('OkRememberedMe').toString();

    console.log('login', islogin);
    console.log('isRemembered', isRemembered);

    if (islogin === 'true') {
      return true;
    }
    else { return false; }

    // if (isRemembered === 'true') {
    //   if (islogin === 'true') {
    //     return true;
    //   }
    //   if (islogin === 'false') {
    //     return false;
    //   }
    // }
    // if (isRemembered === 'false') {
    //   if (islogin === 'true') {
    //     return false;
    //   }
    //   if (islogin === 'false') {
    //     return false;
    //   }
    // }


    // if (islogin === 'true' && isRemembered === 'true') {
    //   return true;
    // } else if (islogin === 'true' || isRemembered === 'false') {
    //   return false;
    // } else {
    //   // return this.router.parseUrl("/");
    //   return false;
    // }
  }
}
