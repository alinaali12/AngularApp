import { Injectable } from '@angular/core';
//import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CanActivate,Router }from '@angular/router';
import apiservice from './Services/apiservices';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private apiservice:apiservice, private _router:Router)
  {}
 canActivate():boolean
 {
   if(this.apiservice.loggedIn()=="true")
   {
    return true
   }
   else{
     this._router.navigate(['/login'])
     return false
   }
  
 }
}
