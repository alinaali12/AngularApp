import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = 'Movies';
  constructor(private router: Router) { }

  ngOnInit() { }
  logOut() {
    console.log('logOut');
    const check = false;
    localStorage.setItem('isLogin', check.toString());
    localStorage.setItem('OkRememberedMe', check.toString());
    const islogin = localStorage.getItem('isLogin').toString();

    const isRemembered = localStorage.getItem('OkRememberedMe').toString();
    console.log('log out login', islogin);
    console.log('log out isRemembered', isRemembered);
    this.router.navigateByUrl('/');

  }

}
