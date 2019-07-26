import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private cookie:CookieService) { }

  ngOnInit() {
  }
  LogOut(){
    localStorage.setItem("token","false");
    this.cookie.set('token', "false", 0.5/24);
    console.log("logged out");
    this.router.navigateByUrl('');
  }

}
