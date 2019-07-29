import { Component } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularApp';

  countdownnumber;
  public time;
  counter;
  interval;
  checkk:number=0;
  constructor( private router:Router ) { }
  check:string="false";
  ngOnInit(){
    console.log('oninit');
    this.checkout();
}
checkout()
{
  if(localStorage.getItem('token')=="true")
  {
  this.counter = 10;
  this.interval = setInterval(() => {
    console.log(this.counter);
    this.counter--;
    if(this.counter < 1 ){
      
      this.router.navigate(['/login']);
      clearInterval(this.interval);
    };
  }, 1000);
}
}
logout()
{
  clearInterval(this.interval);
  console.log('logoutttt', interval);
  this.counter=0;
}
}
