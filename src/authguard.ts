import { CanActivate, Route, Router } from '@angular/router';
import { LoginServiceService } from './app/login-service.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authservice: LoginServiceService, private route: Router) { }
    // tslint:disable-next-line:max-line-length
    canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean | import('@angular/router').UrlTree | import('rxjs').Observable<boolean | import('@angular/router').UrlTree> | Promise<boolean | import('@angular/router').UrlTree> {
        console.log('auth', this.authservice.getAuthentication());
        if (this.authservice.getAuthentication()) {
                    return true;
                } else {
                    this.route.navigate(['/error']);
                }
    }
}
