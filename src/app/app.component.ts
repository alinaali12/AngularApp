import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { Permission } from './Permission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularApp';
  permissionData = [];
  constructor(private Serviceobj: DataserviceService) { }
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
}
