import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionManagerService } from './services/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private router:Router, private sessionManager: SessionManagerService){}
  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if (this.sessionManager.isLoggedIn()){
      return true;
    }
    this.router.navigateByUrl('/loginpage');
  }
}
