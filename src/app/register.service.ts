import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisteredUser } from './shared/models/registereduser.model';
import { Router } from '@angular/router';
import { EditService } from './edit.service';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  _url='https://localhost:44347/api/RegisteredUsers';
  sort="name";
  pageIndex=1;
  searchval="";
  searchcol="";
  permission:any;

  constructor(private _http: HttpClient,private router: Router,private _registerservice:RegisterService, private _idservice:EditService, private _permservice:PermissionService) {}


  Register(user:RegisteredUser){
    return this._http.post<any>(this._url,user);
  }

  ViewAll() {
    return this._http.get(this._url+"/GetAll");
  }

  SearchWith(value:string,column:string){
    this.searchval=value;
    this.searchcol=column;
    return this._http.get(this._url+"/GetAll?sortOrder="+this.sort+ "&pageIndex=" + this.pageIndex+"&val="+this.searchval+"&col="+this.searchcol);
  }

  SortBy(sorton:string){
    this.sort=sorton;
    return this._http.get(this._url+"/GetAll?sortOrder="+this.sort+ "&pageIndex=" + this.pageIndex);
  }

  GetPage(pageno:number){
    console.log("pageno:", pageno);
    return this._http.get(this._url+"/GetAll?sortOrder="+this.sort+ "&pageIndex=" + pageno);
  }

  GetCount(){
    return this._http.get(this._url+"/GetCount");
  }

  Delete(id:number){
    return this._http.delete(this._url+"/"+id);
  }

  Update(user:RegisteredUser,id:number){
    return this._http.put(this._url+"/"+id,user);
  }
  
  async CheckPermissions(){
    var tempURL="http://localhost:4200"+this.router.url;
    if(localStorage.getItem(tempURL) === null){//means array is empty
      await this._permservice.ViewAll().then(value=>{
        this.permission=value;
        //console.log(this.permission);
        for(var i=0;i<3;i++){
          localStorage.setItem(this.permission[i].siteUrl,this.permission[i].access);
          console.log("in loop",localStorage.getItem(this.permission[i].siteUrl));
        }
      });
    }
  }
}
