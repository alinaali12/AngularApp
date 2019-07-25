import {Injectable}  from '@angular/core';
import { Observable } from 'rxjs';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Permission } from '../classes/Permission';
import {LocalStorageService} from 'ngx-webstorage';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';



@Injectable()
export class UrlService
{
    public api="https://localhost:44347/api";



    public userapi=`${this.api}/UserPermissions`;
constructor(private httpclient:HttpClient, private localStorage: LocalStorageService){

}
 geturl (){ // : Promise<any>{
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("Async Work Complete");

          console.log('getdata');
          let permis = new Array<Permission>();
            this.httpclient.get<Permission>(this.userapi).subscribe(res=>{
              // console.log(res);
              permis.push(res);
            });

            console.log(permis.length, " ", permis)
            
            if (permis.length>0){
                this.localStorage.clear();
               // console.log(permis)
                this.localStorage.store("permissios",JSON.stringify(permis));
                console.log(this.localStorage.retrieve("permissios"));

                resolve();
            }
            
         
        }, 1000);
      });
      return promise;

     
   

     
  }}