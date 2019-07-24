import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pemission } from 'src/app/classes/permission/pemission';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  public _permissionsUrl;
  public allPermissions: Array<Pemission>;
  
  constructor(private http:HttpClient) { 
    this._permissionsUrl = "https://localhost:44347/api/Permissions";
  }

  getAllPermissions() {
    console.log("inside initialization in loadservice...");
    var response= this.http.get<Array<Pemission>>(this._permissionsUrl).subscribe((data)=>{
      this.allPermissions = new Array<Pemission>()
      this.allPermissions = data;
      sessionStorage.setItem("currentPermissions",JSON.stringify(this.allPermissions))
  });
    console.log('response in app-load service',sessionStorage.getItem('currentPermissions'));
    return response;
  }
}
