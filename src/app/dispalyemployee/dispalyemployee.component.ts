import { Component, OnInit, Input, Output, Directive, EventEmitter} from '@angular/core';
import{ freeApiService } from '../services/freeapi.services';
import { observable } from 'rxjs';
import { User } from '../classes/User';
import * as R from 'ramda'





@Component({
  selector: 'app-dispalyemployee',
  templateUrl: './dispalyemployee.component.html',
  styleUrls: ['./dispalyemployee.component.scss']
})


export class DispalyemployeeComponent implements OnInit {
  constructor(private _freeApiService :freeApiService ) {
   }
   
  users:User[]; 
  namesort: string = "asc";
  idsort: string = "asc";
  none:string = "none";
  empty:String = "";

  totalusers:User[]; 
  pageno: number = 0 ;
  ngOnInit() {
    this.users = [];
    this.totalusers = [];

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

  sortname(){
   

    if (this.namesort=="asc"){
      this.namesort = "des";
      //this.totalusers = this.totalusers.sort((a,b) => a.Name.localeCompare(b.Name));
      this.totalusers = R.sortBy(R.prop('name'), this.totalusers)
    }else{
      this.namesort = "asc";
      //this.totalusers = this.totalusers.sort((a,b) => b.Name.localeCompare(a.Name));
      this.totalusers = R.reverse(this.totalusers);
    }

  }

  sortid(){
   

    if (this.idsort=="asc"){
      this.idsort = "des";
      //this.totalusers = this.totalusers.sort((a,b) => a.Name.localeCompare(b.Name));
      this.totalusers = R.sortBy(R.prop('id'), this.totalusers)
    }else{
      this.idsort = "asc";
      //this.totalusers = this.totalusers.sort((a,b) => b.Name.localeCompare(a.Name));
      this.totalusers = R.reverse(this.totalusers);
    }

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
