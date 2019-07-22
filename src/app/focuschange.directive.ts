import { Directive,ElementRef, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[Tabchange],[appFocuschange],[myValue="Boring"]',
})
export class FocuschangeDirective {
  
  @HostBinding('class') newClass: string;
 
  @HostListener('focus' ) onFocus(){ 
    //Note that the second argument is a list of arguments to be to sent to the function.  
    this.oldClass=this.newClass;
    this.newClass= "nav-link background-tabs active ";
    
   // console.log("New Value:",this.newClass);
  }
  @HostListener('blur', )onBlur(){
  
   this.newClass=this.oldClass;
  }
  @Input('appFocuschange') public x:string;
  @Input('myValue') public y:string;
  public oldBack:string;
  public oldClass: string;
  constructor() {   
  }
   
   ngOnInit() {
     this.newClass='nav-link';
   //console.log("Load Value:",this.newClass='nav-link');
  }
}
