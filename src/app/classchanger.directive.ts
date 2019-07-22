import { Directive , HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[Panechange]'
})
export class ClasschangerDirective {
  @HostBinding('class') newClass :string;
  @HostListener('focus' ) onFocus(){ 
    //Note that the second argument is a list of arguments to be to sent to the function.  
    this.oldClass=this.newClass;
    this.newClass= "ab-pane container-fluid active";
    
  console.log("New Value:",this.newClass);
  }
  @HostListener('blur', )onBlur(){  
   this.newClass=this.oldClass;
  }
  oldClass:string;
  constructor() { }
  ngOnInit(){
    this.newClass ="tab-pane container-fluid active";
    console.log(this.newClass);
  }

}
