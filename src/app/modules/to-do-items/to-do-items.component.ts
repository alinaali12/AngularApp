import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/TodoItems/api.service';
import { TodoItem } from '../../classes/todoItem/todo-item';

@Component({
  selector: 'app-to-do-items',
  templateUrl: './to-do-items.component.html',
  styleUrls: ['./to-do-items.component.scss']
})
export class ToDoItemsComponent implements OnInit {
  items = [];
  pageOfItems: Array<any>;
  private totalCount:number;
  private todoItems:Array<TodoItem>;
  private columns;
  
  constructor(private _apiService: ApiService) { 
    this.columns = ['Id','Title','IsComplete','Description','Priority','File'];
  
  }

  ngOnInit() {
    this._apiService.getCountOfAllRecords().subscribe((data)=>{
      this.totalCount = data;
      console.log("page no got by dbtodoitems is",this.totalCount);
    });

      this._apiService.getRecords().subscribe((data)=>{
        this.todoItems = data;
        this.items = Array(this.todoItems.length).fill([], 0).map((x, i) => (this.todoItems[i]));
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

 
}
