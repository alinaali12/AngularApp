import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookie:CookieService,private router: Router) { }
    canActivate(
      next:ActivatedRouteSnapshot,
      state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        var any =this.cookie.get('token');
        console.log('cookie', any)
        if(any=="true"){
          return true;
        }
        console.log("logged out");
        this.router.navigateByUrl('');
        return false;
      }
    
}
