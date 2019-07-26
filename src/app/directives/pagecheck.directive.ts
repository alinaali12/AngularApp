import { Directive, Input, HostListener, HostBinding } from '@angular/core';

import { RouterLink, Router, } from '@angular/router';
import { SiblingCommunicatorService } from '../services/sibling-communicator.service';
import { Location } from '@angular/common';

@Directive({
  selector: '[appPagecheck],[PageChecker]'
})
export class PagecheckDirective {

  constructor(private location: Location, private router:Router, private sharedService: SiblingCommunicatorService) {
    //console.log('Error Page Called');
     this.onClick();
   }
  BaseUrl= 'http://localhost:4200';
  CurrentUrl :string ;

  isPermitted(CurrentUrl){
    let tempBool: boolean; 
   // console.log('Checking Url:', CurrentUrl);
    this.sharedService.Urls.forEach(element => { 
      if (element.url==CurrentUrl)
        tempBool = element.permission;
    }
     );
    return tempBool;
 }
 
 @HostListener( 'click' ) async onClick(){ 
  this.CurrentUrl=  this.BaseUrl+  this.location.path();
 
    if (!this.isPermitted(this.CurrentUrl)){
     this.router.navigateByUrl('error');
    }
  }


}
