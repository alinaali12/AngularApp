import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodel } from '../usermodel';
@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.scss']
})
export class ShowresultComponent implements OnInit {
  Users;
  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
    this.dataservice.getUsers().subscribe((userData) => this.Users = userData);
  }
  fetch() {
  //  this.dataservice.getUsers().subscribe((userData) => this.Users = userData);
    this.dataservice.getUsers().subscribe((userData) => {
    this.Users = userData;
    console.log('s', this.Users);
    });
  }

}
