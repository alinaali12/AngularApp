import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodel } from '../usermodel';
import { EditDataComponent } from '../edit-data/edit-data.component';
import { ChangeDetectorRef } from '@angular/core';
import { stat } from 'fs';
import { userInfo } from 'os';
import { LoginServiceService } from '../login-service.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.scss']
})
export class ShowresultComponent implements OnInit {
  pages: any;
  pagesArray;
  Users = [];
  deleteres;
  sortres;
  edituser: Usermodel = new Usermodel();
  comments;
  putres;
  fileres: Usermodel;
  editedUser: Usermodel;
  fileUser: Usermodel = new Usermodel();
  toggle = 'notshow';
  filebase64;
  active = 1;
  status = 'Id';
  getUser = new Usermodel();
  sortstatus = '';
  constructor(private dataservice: DataserviceService, private loginservice: LoginServiceService) { }
  timer;
  ngOnInit() {
   this.getPageData(1);
   //  this.dataservice.getUsers().subscribe((userData) => this.Users = userData);
   this.dataservice.getUsers().subscribe(data => {
    this.Users = data;
    console.log('s', this.Users);
    this.getpages();
    this.edituser = new Usermodel();
    this.editedUser = new Usermodel();
    this.timer = this.loginservice.getSession();
    interval(1000).subscribe(x => {
    this.timer = this.loginservice.getSession();
    });
    });
  }
  getPageData(page: number) {
    this.active = page;
    console.log('activepage', this.active);
    this.dataservice.getUsers(page).subscribe((userData) => {
      this.Users = userData;
      console.log('s', this.Users);
      this.getpages();
      });
  }
 deleteuser(id: number) {
   if (confirm('Are you sure to delete ' + id)) {
    this.dataservice.DeleteData(id).subscribe((result) => {
      this.deleteres = result;
      console.log('s', this.deleteres);
      this.ngOnInit();
    }
    );
   }
  }
  sort(name: string, page: number = 1) {
   // this.sortstatus = 'clicked';
    this.status = name;
    console.log('sort', name + page);
    this.dataservice.sortData(name, page).subscribe(data => {
      this.Users = data;
    }
    );
   }
   getpages() {
     this.dataservice.getPageCount().subscribe(data => {
        this.pages = data;
        this.pages = this.pages / 5;
        console.log(this.pages);
        this.pagesArray = new Array(Math.ceil(this.pages));
        console.log(this.pagesArray);
      } );
   }
   passId(userpassed: Usermodel) {
    //  localStorage.clear();
    //  console.log('passid', userpassed.id);
    //  this.dataservice.EditUserData(userpassed.id).subscribe(data => {
    //   this.edituser = data;
    //   console.log('s', this.edituser);
    //   this.toggle = 'show';
    //   });
     console.log('passid', userpassed);
     this.dataservice.saveUser(userpassed);
     this.dataservice.saveToggle('show');
   }
  savechanges() {
     console.log(this.edituser);

     this.dataservice.saveEditedUser(this.edituser).subscribe(data => {
      this.putres = data;
      console.log('s', this.putres);
      this.ngOnInit();
    }
    );
   }
  cancel() {
     this.toggle = 'notshow';
   }
  DownloadUserFile(file) {
    this.fileUser.fileNames = file;
    console.log( this.fileUser.fileNames);
    this.dataservice.downloadFile(this.fileUser).subscribe(data => {
      this.filebase64 = data.fileNames;
      console.log('downloaduser', data);
      const name = this.filebase64.split(',');
      const ext = this.filebase64.split('.');
      console.log('base', name[0]);
      console.log('name', name[1]);
      console.log('extension', ext[1]);
      const obj = this.base64ToBlob(name[0], ext[1]);
      const url = window.URL.createObjectURL(obj);
      const link = document.createElement('a');
      link.href = url;
      link.download = name[1];
      link.click();
    });
  }
  base64ToBlob(b64Data, contentType = '', sliceSize= 512) {
    console.log(b64Data);
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
}
}
