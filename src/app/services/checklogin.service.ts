import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo, ResponseCheck } from '../models/login-info';

@Injectable({
  providedIn: 'root'
})
export class CheckloginService {

  BaseUrl='https://localhost:44347/api/';
  ModelName: string = "Login_Saad";
  //GetVal : string ="GetAll";
 
  _url= this.BaseUrl+this.ModelName;

  constructor(private _http: HttpClient) {}

  async SendData(User: LoginInfo): Promise<any>{
    console.log('Sending Login Request');
   let Response : ResponseCheck = await this._http.post(this._url+"/"+"CheckLogin",User).toPromise() as ResponseCheck;
   console.log(Response.found);
   return (Response.found);
  }
 
}
