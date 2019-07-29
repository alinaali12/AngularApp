import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from './shared/models/Login.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  _url="https://localhost:44347/api/RegisteredUsers/GetPermission";
  _url2="https://localhost:44347/api/RegisteredUsers/Match";

  constructor(private _http: HttpClient) { }
  
  async ViewAll():Promise <any> {
    console.log("permission get");
    return await this._http.get(this._url).toPromise();
  }

  async Match(_u:UserLogin):Promise <any>{
    var _u2=new UserLogin();
    _u2.password=btoa(_u.password);
    _u2.email=_u.email;
    var confirm=await this._http.post(this._url2,_u2).toPromise();
    console.log("Match",confirm);
    return confirm;
  }
}
