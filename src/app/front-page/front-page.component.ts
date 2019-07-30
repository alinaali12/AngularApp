import { Component, OnInit } from '@angular/core';
import { Usermodel } from '../usermodel';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { LoginServiceService } from '../login-service.service';

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
  fileN;
  file;
  basestring;
  model = new Usermodel();
  router: Router;
  fileName: string;
  filePreview: string;
  userfile: Usermodel = new Usermodel();
  status;
  pageToggle;
  EditToggle;
  EditInfo = new Usermodel();
  EditUser = new Usermodel();
  timer;
  constructor(private Serviceobj: DataserviceService, private loginservice: LoginServiceService, private route: Router) { }
  ngOnInit() {
    this.model.choice = 'lilies';
    this.EditToggle = this.Serviceobj.getToggle();
    this.EditUser = this.Serviceobj.getUser();
    console.log('onint', this.Serviceobj.getUser());
    this.loginservice.startSession();
    this.timer = this.loginservice.getSession();
    interval(1000).subscribe(x => {
    this.timer = this.loginservice.getSession();
    });
  }
  showpage() {
    this.EditToggle = '';
    this.status = '';
    this.pageToggle = 'show';
    this.EditUser = new Usermodel();
  }
  SendData() {
  this.status = 'clicked';
  console.log(this.status);
  this.model.name = this.name;
  this.model.email = this.email;
  this.model.comments = this.comments;
  this.model.fileNames = this.fileN;
  this.Serviceobj.sendData(this.model).subscribe(
    data => console.log('success', data),
    error => console.log('error', error)
  );
  console.log('show');
  this.route.navigate(['/showresult']);
}
onFileChanged(event) {
  const reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    this.fileN = file.name;
    reader.onloadend = (e) => {
      console.log(reader.result);
      this.userfile.fileNames = reader.result as string + ',' + file.name + ',' + file.type;
      console.log('file', this.userfile.fileNames);
      this.Serviceobj.saveFile(this.userfile).subscribe(
        data => console.log('success', data),
        error => console.log('error', error)
      );
    };
  }
}
saveChanges(edit: Usermodel) {
  this.status = 'clicked';
  this.model.name = this.name;
  this.model.email = this.email;
  this.model.comments = this.comments;
  this.model.fileNames = this.fileN;
  this.EditInfo.id = edit.id;
  this.EditInfo.fileNames = edit.fileNames;
  if (this.model.name === '') {
    this.EditInfo.name = edit.name;
  } else {
    this.EditInfo.name = this.model.name;
  }
  if (this.model.email === '') {
    this.EditInfo.email = edit.email;
  } else {
    this.EditInfo.email = this.model.email;
  }
  if (this.model.choice === '') {
    this.EditInfo.choice = edit.choice;
  } else {
    this.EditInfo.choice = this.model.choice;
  }
  if (this.model.comments === '') {
    this.EditInfo.comments = edit.comments;
  } else {
    this.EditInfo.comments = this.model.comments;
  }
  console.log('saveuser', this.EditInfo);
  this.Serviceobj.saveEditedUser(this.EditInfo).subscribe(data => {
    console.log('s', data);

  }
  );
}
cancel() {
  this.pageToggle = '';

}
}
