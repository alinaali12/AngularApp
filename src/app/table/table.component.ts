import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';


import { RegisterService } from '../register.service';
import { EditService } from '../edit.service';
import { RegisteredUser } from '../shared/models/registereduser.model';
import { PermissionService } from '../permission.service';
import { PermissionObj } from '../shared/models/permission.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
  
})
export class TableComponent implements OnInit {
  tempuser: RegisteredUser;;
  user: Object;
  TotalPages:any;
  fakearray;
  nameh=false;
  emailh=false;
  phoneh=false;
  jobh=false;
  fileh=false;
  displaynames:string[]=['placeholder', 'placeholder', 'placeholder','placeholder','placeholder'];
  pagenum=1;
  SearchCol:string="Name";
  SearchVal:string;
  permission:any;
  

  constructor(private router: Router,private _registerservice:RegisterService, private _idservice:EditService, private _permservice:PermissionService) {}

  ngOnInit() {
    this._idservice.logIn=true;
    this._registerservice.CheckPermissions();
    this._registerservice.ViewAll().subscribe(data => {
      this.user = data;
      for(var i=0;i<5;i++){
        var tempfileName=this.user[i].fileName;
        var tfn=tempfileName.substring(0,tempfileName.indexOf(";"));
        var filename=tfn.substring(9);
        this.displaynames[i]=filename;
        console.log(this.displaynames[i]);
      
      }
    });
    this._registerservice.GetCount().subscribe(data=> {
      this.TotalPages=data
      this.fakearray=new Array(Math.ceil(this.TotalPages/5))
    }) 
  }
  Download(fn:string){
    var tempfileName=fn;
    var tfn=tempfileName.substring(0,tempfileName.indexOf(";"));
    var contentT=tempfileName.substring(tempfileName.indexOf(";")+1);
    var content=contentT.substring(contentT.indexOf(":")+1,contentT.indexOf(";"));
    var base64=tempfileName.substring(tempfileName.indexOf(",")+1);
    var filename=tfn.substring(9);
    var blob=this.base64ToBlob(base64,content);
    var url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
       
  }
  
  Sort(value:string){
    this.nameh=false;
    this.emailh=false;
    this.phoneh=false;
    this.jobh=false;
    this.fileh=false;
    if(value=="name"){
      this.nameh=true;
    }
    if(value=="email_address"){
      this.emailh=true;
    }
    if(value=="phone_number"){
      this.phoneh=true;
    }
    if(value=="job_type"){
      this.jobh=true;
    }
    if(value=="fileName"){
      this.fileh=true;
    }
    this._registerservice.SortBy(value).subscribe(data => {
      this.user = data
      for(var i=0;i<5;i++){
        var tempfileName=this.user[i].fileName;
        var tfn=tempfileName.substring(0,tempfileName.indexOf(";"));
        var filename=tfn.substring(9);
        this.displaynames[i]=filename;
        //console.log(this.displaynames[i]);
      
      }
    }); 
    this._registerservice.GetCount().subscribe(data=> {
      this.TotalPages=data
      this.fakearray=new Array(Math.ceil(this.TotalPages/5))
    }) 
  }
  GetPage(pageno:number){
    this.pagenum=pageno;
    //console.log("this.pagenum", this.pagenum, "pageno:");
    this._registerservice.GetPage(pageno).subscribe(data => {
      this.user = data
      for(var i=0;i<5;i++){
        var tempfileName=this.user[i].fileName;
        var tfn=tempfileName.substring(0,tempfileName.indexOf(";"));
        var filename=tfn.substring(9);
        this.displaynames[i]=filename;
      }
    });
  }

  DeleteEntry(id:number){
    if(confirm("Are you sure you want to delete this entry?")) {
      this._registerservice.Delete(id).subscribe(data=>{console.log(data)
        this.ngOnInit()
        });
    }
  }
  
  set_edit(Tuser:RegisteredUser){
    this._idservice.set_id(Tuser.id);
    this._idservice.set_user(Tuser);
    this._registerservice.GetPage(this.pagenum).subscribe(data=>{
      this.user=data;
    });
  }

  Search(event) {
    if (event.key === "Enter") {
      console.log(this.SearchCol,this.SearchVal)
      this._registerservice.SearchWith(this.SearchVal,this.SearchCol).subscribe(data=>{
        this.user=data;
        for(var i=0;i<5;i++){
          var tempfileName=this.user[i].fileName;
          var tfn=tempfileName.substring(0,tempfileName.indexOf(";"));
          var filename=tfn.substring(9);
          this.displaynames[i]=filename;
          console.log(this.displaynames[i]);
        
        }
      });
      this._registerservice.GetCount().subscribe(data=> {
        this.TotalPages=data
        this.fakearray=new Array(1)
      }) 
    }
  }
  
  public base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); 
    console.log(b64Data);
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
}
}
