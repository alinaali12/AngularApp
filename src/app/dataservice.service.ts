import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usermodel } from './usermodel';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Permission } from './Permission';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

   url = 'https://localhost:44347/api/UserModels';
   EditUser = new Usermodel();
   toggleEdit: string;
   PageData: Array<Permission>;
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
  sortData(name: string, page: number) {
    return this.http.get(this.url + '?page=' + page + '&limit=5&sort=' + name)
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
  saveToggle(toggle) {
    this.toggleEdit = toggle;

  }
  saveUser(user: Usermodel) {
    this.EditUser = user;
    console.log(this.EditUser + 'service' + this.EditUser.name);
  }
  getUser() {
    return this.EditUser;
    console.log('service', this.EditUser);
  }
  getToggle() {
    return this.toggleEdit;
  }
  setPermissions(): Observable <Permission[]> {
   return this.http.get('https://localhost:44347/api/Permissions')
    .map((response: Response) => response as unknown as Permission[]);
  }
  preservePermissions(pages: Permission[]) {
    this.PageData = pages;
  }
  GetPageData() {
    return this.PageData;
  }
}
