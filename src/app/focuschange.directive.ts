import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[myFocus],[appFocuschange],[myValue="Boring"]',
})
export class FocuschangeDirective {
  @HostListener('focus', ) onFocus(){ 
    //Note that the second argument is a list of arguments to be to sent to the function.
    this.oldVal=this.E.nativeElement.style.background;
    this.E.nativeElement.style.background= "  #aed6f1" ;
   // console.log(this.E.nativeElement);
  }
  @HostListener('blur', )onBlur(){
    this.E.nativeElement.style.background=this.oldVal;
  }
  @Input('appFocuschange') public x:string;
  @Input('myValue') public y:string;
  public oldVal:string;
  constructor(private E: ElementRef) {   
  }
   
   ngOnInit() {
   // console.log(this.E.nativeElement);
  }
}
