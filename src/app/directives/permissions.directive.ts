import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AppLoadService } from '../services/onappload/app-load.service';
import { Pemission } from '../classes/permission/pemission';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective  {
  public route: string;
  allpermissions: Pemission[];

  constructor( router: Router,location: Location,dataService:AppLoadService) { 
    router.events.subscribe(val => {
        this.route = location.path();
      
        this.allpermissions = JSON.parse(sessionStorage.getItem('currentPermissions'));
        console.log("Printing all permissions in directive", this.allpermissions[0].pageUrl);
        for(var i = 0; i <= this.allpermissions.length; i++){
          console.log(this.allpermissions[i].pageUrl,"'"+ this.route+"'",i);
          console.log(this.allpermissions[i].pageUrl == this.route);
          if (this.allpermissions[i].pageUrl == this.route) {
            if (this.allpermissions[i].isAccessible == false) {
              router.navigate(['/error']);
              console.log("I am there");
              return;
            }
          }
       }
    });


  }

  private checkRoutePermissions() {
   
  }
}
