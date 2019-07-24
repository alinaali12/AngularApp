import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularApp';
  constructor(private Serviceobj: DataserviceService) { }
  ngOnInit() {
    console.log('appcomponentoninit');
   }
}
