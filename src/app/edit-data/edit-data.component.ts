import { Component, OnInit } from '@angular/core';
import { Usermodel } from '../usermodel';
import { DataserviceService } from '../dataservice.service';
import { ShowresultComponent } from '../showresult/showresult.component';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {
  user;
  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
  }
  
}
