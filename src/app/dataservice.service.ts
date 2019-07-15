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
  getUsers(): Observable<Usermodel[]> {
    return this.http.get(this.url)
    .map((response: Response) => response as unknown as Usermodel[]);
  }
  sendData(user: Usermodel) {
    return this.http.post<any>(this.url, user);
  }
}
