import { Directive, OnInit } from '@angular/core';
import { _countGroupLabelsBeforeOption } from '@angular/material';
import AccessControl from './Clsses/AccessControlClass';
import apiservice from './Services/apiservices';
import { Router } from '@angular/router';
// import AccessControl from '../Clsses/AccessControlClass';

@Directive({
  selector: '[appCheckAccess]'
})
export class CheckAccessDirective implements OnInit {
Access:Array<AccessControl>=new Array<AccessControl>();
urll;
check:string="false";
  constructor(private apiservice:apiservice,  private router: Router) { }
  ngOnInit()
  {
    this.apiservice.AccessData().subscribe(data=>{
      console.log('Response result1',this.Access=data);
      this.urll="http://localhost:4200"+this.router.url;
      console.log('urrllll',this.urll);
       this.Access.forEach(data => {
      if (data.url === this.urll && data.status === 'denied') {
          console.log('denied');
          this.router.navigate(['/errorpage']);
        }
     });
  });
}
 Counter()
  {
    if(localStorage.getItem('token')=="Found")
    {
    var counter = 5;
    
    var interval =  setInterval(() => {
      console.log(counter);
      counter--;
      
  
      if(counter > 0 ){
          console.log("gre")
    
      } else {
        clearInterval(interval);
        console.log('else',this.check);
        return this.check;
      }
      return this.check;
    }, 1000);
   return interval;
  }
}
}