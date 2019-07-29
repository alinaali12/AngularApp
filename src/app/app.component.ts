import { DataService } from './services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularApp';
  constructor(private dataService: DataService) {

  }
  ngOnInit() {
    this.getAllPages();
    this.checkRememberMe();
  }
  getAllPages() {
    this.dataService.getAllPages().subscribe(data => {
      localStorage.setItem('permissionData', JSON.stringify(data));
      // const check = JSON.parse(localStorage.getItem('permissionData'));
      // console.log(check);

    });
  }

  checkRememberMe() {
    const rememberMeCheck = localStorage.getItem('rememberMe');
    const loggedInCheck = sessionStorage.getItem('isLogin');
    let checked = false;
    if (rememberMeCheck === 'true' || loggedInCheck === 'true') {
      checked = true;
      localStorage.setItem('OkRememberedMe', checked.toString());
      sessionStorage.setItem('isLogin', checked.toString());
      return true;
    } else { return false; }
  }
}
