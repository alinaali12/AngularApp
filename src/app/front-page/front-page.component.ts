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
  file;
  basestring;
  model = new Usermodel();
  router: Router;
  fileName: string;
  filePreview: string;
  userfile: Usermodel = new Usermodel();
  constructor(private Serviceobj: DataserviceService) { }
  ngOnInit() {
    this.model.choice = '';
  }
  SendData() {
  this.model.name = this.name;
  this.model.email = this.email;

  this.model.comments = this.comments;
  this.model.FileNames = this.fileNames;
  this.Serviceobj.sendData(this.model).subscribe(
    data => console.log('success', data),
    error => console.log('error', error)
  );
}
onFileChanged(event) {
  const reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    this.fileName = file.name + ' ' + file.type;
    reader.onloadend = (e) => {
      console.log(this.fileName);
      this.userfile.FileNames = reader.result as string;
      this.Serviceobj.saveFile(this.userfile).subscribe(
        data => console.log('success', data),
        error => console.log('error', error)
      );
     // console.log(reader.result);
     // this.filePreview = reader.result as string;
     // const base = this.filePreview.split(',');
     // console.log('s', base[1]);
    };
  }
}
}
