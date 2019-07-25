import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from 'src/app/classes/todoItem/todo-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl;
  constructor(private http:HttpClient) { 
    this._apiUrl = "https://localhost:44347/api/DbToDoItems/";
  }

  getCountOfAllRecords() {
    var getCountPathToBeAppended= "/getCount";

    var response= this.http.get<number>(this._apiUrl+getCountPathToBeAppended);
    return response;
  }

  getRecords(currentPageNo: string="", pageCapacity:string="", orderByAttribute:string="", searchForWord:string = "", searchInAttribute:string =""  ) 
  {
    var response= this.http.get<Array<TodoItem>>(this._apiUrl);
    return response;
  }
}
