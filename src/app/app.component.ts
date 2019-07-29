import { DataService } from './services/dataService/data.service';
import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { NavbarService } from './services/navbarService/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NavbarService]
})
export class AppComponent implements OnInit {
  title = 'AngularApp';
  constructor(private dataService: DataService, public nav: NavbarService) {

  }
  ngOnInit() {
    this.getAllPages();
    this.checkRememberMe();
    this.showHideNavbar();
  }

  showHideNavbar() {
    console.log('nav show/hide', this.nav.visible);

    // const rememberMeCheck = localStorage.getItem('rememberMe');
    const loggedInCheck = sessionStorage.getItem('isLogin');
    // if (loggedInCheck === 'true' || rememberMeCheck === 'true') {
    if (loggedInCheck === 'true') {
      this.nav.show();
    }

  }
  getAllPages() {
    this.dataService.getAllPages().subscribe(data => {
      localStorage.setItem('permissionData', JSON.stringify(data));
      // const check = JSON.parse(localStorage.getItem('permissionData'));
      // console.log(check);

    });
  }

  checkRememberMe() {
    // const rememberMeCheck = localStorage.getItem('rememberMe');
    const loggedInCheck = sessionStorage.getItem('isLogin');
    let checked = false;
    // if (rememberMeCheck === 'true' || loggedInCheck === 'true') {
    if (loggedInCheck === 'true') {
      checked = true;
      // localStorage.setItem('OkRememberedMe', checked.toString());
      sessionStorage.setItem('isLogin', checked.toString());
      return true;
    } else { return false; }
  }
}
