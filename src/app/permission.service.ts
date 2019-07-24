import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  _url="https://localhost:44347/api/RegisteredUsers/GetPermission";

  constructor(private _http: HttpClient) { }
  
  async ViewAll():Promise <any> {
    console.log("permission get");
    return await this._http.get(this._url).toPromise();
  }
}
