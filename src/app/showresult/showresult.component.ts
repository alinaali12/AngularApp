import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodel } from '../usermodel';
import { EditDataComponent } from '../edit-data/edit-data.component';
import { ChangeDetectorRef } from '@angular/core';
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
  edituser: Usermodel;
  comments;
  putres;
  editedUser: Usermodel;
  toggle = 'notshow';
  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
   //  this.dataservice.getUsers().subscribe((userData) => this.Users = userData);
   this.dataservice.getUsers().subscribe(data => {
    this.Users = data;
    console.log('s', this.Users);
    this.getpages();
    this.edituser = new Usermodel();
    this.editedUser = new Usermodel();
    });
  }
  getPageData(page: number) {
    this.dataservice.getUsers(page).subscribe((userData) => {
      this.Users = userData;
      console.log('s', this.Users);
      this.getpages();
      });
  }
 deleteuser(id: number) {
   this.dataservice.DeleteData(id).subscribe((result) => {
     this.deleteres = result;
     console.log('s', this.deleteres);
     this.ngOnInit();
   }
   );
  }
  sort(name: string) {
    this.dataservice.sortData(name).subscribe(data => {
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
   passId(id: number) {
     console.log('passid', id);
     this.dataservice.EditUserData(id).subscribe(data => {
      this.edituser = data;
      console.log('s', this.edituser);
      this.toggle = 'show';
      });
   }
  savechanges() {
     console.log(this.edituser);

     this.dataservice.saveEditedUser(this.edituser).subscribe(data => {
      this.putres = data;
      console.log('s', this.putres);
      this.ngOnInit();
      this.toggle = 'notshow';
    }
    );
   }
  cancel() {
     this.toggle = 'notshow';
   }
}
