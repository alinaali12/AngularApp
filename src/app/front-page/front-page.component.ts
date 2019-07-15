import { Component, OnInit } from '@angular/core';
import { Usermodel } from '../usermodel';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  name = '';
  email = '';
  comments = '';
  choice = '';
  fileNames = 'dummy';
  model = new Usermodel();
  router: Router;
  constructor(private Serviceobj: DataserviceService) { }
  ngOnInit() {
    this.model.choice = '';
  }
  SendData() {
  this.model.name = this.name;
  this.model.email = this.email;

  this.model.comments = this.comments;
  this.model.fileNames = this.fileNames;
  this.Serviceobj.sendData(this.model).subscribe(
    data => console.log('success', data),
    error => console.log('error', error)
  );
}
}
