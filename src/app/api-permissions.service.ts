import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission_URL } from './Permission_URL';

@Injectable({
  providedIn: 'root'
})
export class ApiPermissionsService {
  BaseUrl='https://localhost:44347/api/';
  ModelName: string = "UrlChecker_Saad";
  //GetVal : string ="GetAll";
  
  _url= this.BaseUrl+this.ModelName;

  constructor(private _http: HttpClient) {}

  async GetUrls () : Promise<any>{
    console.log('Getting From API');
    return await this._http.get<Permission_URL>(this._url).toPromise();
  }
}
