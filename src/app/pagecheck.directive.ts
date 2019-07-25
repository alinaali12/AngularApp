import { Directive, Input, HostListener, HostBinding } from '@angular/core';
import {Location} from '@angular/common';
import { RouterLink, Router, ɵangular_packages_router_router_o } from '@angular/router';
import { SiblingCommunicatorService } from './sibling-communicator.service';

@Directive({
  selector: '[appPagecheck],[PageChecker]'
})
export class PagecheckDirective {

  BaseUrl= 'http://localhost:4200';
  CurrentUrl :string ;

  isPermitted(){
    let tempBool: boolean;
    this.sharedService.Urls.forEach(element => { 
      if (element.url==this.CurrentUrl){ 
        tempBool = element.permission;
      }
    });
    return tempBool;
 }
 
 @HostListener( 'click' ) async onClick(){ 
    await this.router.events.subscribe(value=>{
      this.CurrentUrl=  this.BaseUrl+ this._location.path();
    })
    if (!this.isPermitted()){
     this.router.navigateByUrl('errorpage');
    }
  }
 
  
  constructor(private _location: Location,private router:Router, private sharedService: SiblingCommunicatorService) {
      this.onClick();
   }

}
