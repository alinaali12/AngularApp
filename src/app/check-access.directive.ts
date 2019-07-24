import { Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appCheckAccess]'
})
export class CheckAccessDirective {

  access:string;

  constructor(private router: Router,private el: ElementRef) { }

   ngOnInit(){
    var tempURL="http://localhost:4200"+this.router.url;
    this.access=localStorage.getItem(tempURL);
    console.log("in directive",this.access);
    if(this.access=="false"){
      //this.el.nativeElement.style.display='none';
      this.router.navigateByUrl('error');
    }
   }
}
