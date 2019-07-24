import { Component, OnInit, Input, Output, Directive, EventEmitter} from '@angular/core';
import{ freeApiService } from '../services/freeapi.services';
import { observable } from 'rxjs';
import { User } from '../classes/User';







@Component({
  selector: 'app-dispalyemployee',
  templateUrl: './dispalyemployee.component.html',
  styleUrls: ['./dispalyemployee.component.scss']
})


export class DispalyemployeeComponent implements OnInit {
  sortorder ;
  constructor(private _freeApiService :freeApiService ) {
   }
   
  users:User[]; 
  
  totalusers:User[]; 
  pageno: number = 0 ;
  ngOnInit() {
    this.sortorder =new Map([['File', ''],['Employe_Role', ''],['Address', ''], ['Name', 'des'], ]);
    this.users = [];
    this.totalusers = [];
    console.log(this.sortorder)

    this._freeApiService.getusers()
    .subscribe(
      data=>
      {
        
        console.log('response result',this.totalusers=data);
        if (this.totalusers.length>10){
          this.users = this.totalusers.slice(0, this.pageno + 10);
          this.pageno = 1;
        }
      }
    );
   





  }

  pageChanged(event){
    this.pageno = this.users.length;
    let pages = 0;
    if (this.pageno+10 < this.totalusers.length){
      pages = this.pageno + 10;
    }else if (this.pageno < this.totalusers.length){
      pages = this.totalusers.length - this.pageno;
    }else{
      
    }

    this.users = this.totalusers.slice(this.pageno, pages);
    
    
  }
  DownloadFile(userfile){
    this._freeApiService.DownloadFile(userfile);
  }
}
