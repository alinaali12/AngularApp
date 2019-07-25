import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { Permission } from './Permission';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularApp';
  permissionData = [];
  timer = 30;
  constructor(private Serviceobj: DataserviceService, private loginSer: LoginServiceService, private route: Router) { }
  ngOnInit() {
    console.log('appcomponentoninit');
    this.Serviceobj.setPermissions().subscribe(data => {
        this.setdata(data);
        this.ShareData();
      });
    interval(1000 * 60).subscribe(x => {
        this.timer = this.timer - 1;
        if (this.timer === 29) {
          this.logout();
        }
      });
   }
   setdata(data: Permission[]) {
    this.permissionData = data;
    console.log('app', this.permissionData);
   }
   ShareData() {
     this.Serviceobj.preservePermissions(this.permissionData);
   }
   logout() {
     this.loginSer.setAuthentication('false');
     this.route.navigate(['/login']);
   }
}
