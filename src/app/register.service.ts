import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisteredUser } from './shared/models/registereduser.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  _url='https://localhost:44347/api/RegisteredUsers';
  sort="name";
  pageIndex=1;

  constructor(private _http: HttpClient) { }


  Register(user:RegisteredUser){
    return this._http.post<any>(this._url,user);
  }

  ViewAll() {
    return this._http.get(this._url+"/GetAll");
  }

  SortBy(sorton:string){
    this.sort=sorton;
    return this._http.get(this._url+"/GetAll?sortOrder="+this.sort+ "&pageIndex=" + this.pageIndex);
  }

  GetPage(pageno:number){
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
}
