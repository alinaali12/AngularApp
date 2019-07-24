import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from 'src/app/classes/todo-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl;
  constructor(private http:HttpClient) { 
    this._apiUrl = "https://localhost:44347/api/DbToDoItems";
  }

  getRecords(currentPageNo: string="", pageCapacity:string="", orderByAttribute:string="", searchForWord:string = "", searchInAttribute:string =""  ) 
  {
    console.log("this",this._apiUrl);
    var response= this.http.get<Array<TodoItem>>(this._apiUrl);
    console.log('response',response);
    return response;
  }
}
