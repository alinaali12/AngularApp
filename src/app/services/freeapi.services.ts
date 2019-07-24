import {Injectable}  from '@angular/core';
import { Observable } from 'rxjs';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/User';
import {saveFile, saveAs} from 'file-saver';


@Injectable()
export class freeApiService
{
    
      
    public api="https://localhost:44347/api";


    public userapi=`${this.api}/Users`;
constructor(private httpclient:HttpClient){}
    getusers(): Observable<any>
    {
return this.httpclient.get(this.userapi);
    }

    deleteuserbyid(id:any): Observable<any>{
        this.userapi =`${this.api}/Users`;
        const headers = new HttpHeaders().set('content-type', 'application/json');

return this.httpclient.delete(this.userapi+"/"+id, {headers});
    }
    getuserbyid( id: any): Observable<any>
    {
        this.userapi =`${this.api}/Users`;
        const headers = new HttpHeaders().set('content-type', 'application/json');

return this.httpclient.post(this.userapi+"/"+id, {headers}); //chnging
    }
    updateuser(user: any){
        this.userapi =`${this.api}/Users`;
        const headers = new HttpHeaders().set('content-type', 'application/json');
console.log("url ",this.userapi+"/"+user.id);
return this.httpclient.put(this.userapi+"/"+user.id, user,{headers});
    }

    adduser(user: User): Observable<any>{

        /*let headers = new HttpHeaders();

        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append('Access-Control-Allow-Origin', '*'); 
        headers.append('Content-Type','application/json');
        */
    

      // const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'}); 
        this.userapi =`${this.api}/Users`;
        const headers = new HttpHeaders().set('content-type', 'application/json');

        return this.httpclient.post(this.userapi,
            user,{headers}
            );
    }
    DownloadFile(userfile){
        //let fileExtension = fileType;
        //let input = filePath;
        return this.httpclient.get("https://localhost:44347/api/users/"+userfile,
        {responseType: 'blob' as 'json'})
        .subscribe(data => {
            if (data == null){
console.log("File not Found");
            }else{

            
          saveAs(data, userfile); 
          console.log(data);
            }
        },err=>{
            console.log(err);
        });
      }

      UploadFile(formData:FormData): Observable<any>{
       return this.httpclient.patch('https://localhost:44347/api/users', formData);
            
      }
}