import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usermodel } from './usermodel';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

   url = 'https://localhost:44347/api/UserModels';
  constructor(private http: HttpClient) {
  }
  EditUserData(id: number): Observable<Usermodel> {
    return this.http.get(this.url + '/' + id)
    .map((response: Response) => response as unknown as Usermodel);
  }
  getUsers(page: number = 1): Observable<Usermodel[]> {
    return this.http.get(this.url + '?page=' + page + '&limit=5&sort=Id')
    .map((response: Response) => response as unknown as Usermodel[]);
  }
  sendData(user: Usermodel) {
    return this.http.post<any>(this.url, user);
  }
  DeleteData(id: number) {
    console.log(this.url + '/' + id);
    return this.http.delete(this.url + '/' + id);
  }
  sortData(name: string) {
    return this.http.get(this.url + '?page=1&limit=5&sort=' + name)
    .map((response: Response) => response as unknown as Usermodel[]);
  }
   getPageCount() {
    return this.http.get(this.url + '/' + 'count');
  }
  saveEditedUser(editedUser: Usermodel) {
    return this.http.put(this.url + '/' + editedUser.id , editedUser);
  }
  saveFile(userfile: Usermodel) {
    return this.http.post(this.url + '/file', userfile);
  }
  downloadFile(downloadFile: Usermodel): Observable<Usermodel> {
    console.log('s', downloadFile.fileNames);
    return this.http.post('https://localhost:44347/api/UserModels/download', downloadFile)
    .map((response: Response) => response as unknown as Usermodel);
  }
}
