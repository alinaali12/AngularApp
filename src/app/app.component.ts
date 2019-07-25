import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { Permission } from './Permission';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularApp';
  permissionData = [];
  constructor(private Serviceobj: DataserviceService, private loginSer: LoginServiceService, private route: Router) { }
  ngOnInit() {
    console.log('appcomponentoninit');
    this.Serviceobj.setPermissions().subscribe(data => {
        this.setdata(data);
        this.ShareData();
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
     this.loginSer.resetSession();
   }
}
