import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/TodoItems/api.service';
import { TodoItem } from '../../classes/todoItem/todo-item';
import { Subscription } from 'rxjs';

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
  private totalPages;
  private itemsPerPage;
  private numbers = [];
  subscription: Subscription;

  constructor(private _apiService: ApiService) { 
    this.columns = ['Id','Title','IsComplete','Description','Priority','File'];
    this.itemsPerPage = 5;
  }

  ngOnInit() {
    this.subscription = this._apiService.getCountOfAllRecords().subscribe((data)=>{
      this.totalCount = data;
      this.totalPages = Math.ceil(this.totalCount/this.itemsPerPage);
      this.numbers = Array(this.totalPages).fill([],0).map((x,i)=>i);

    });

    this.getDataForPagination();
    
  }

  getDataForPagination(pageNo=1) {
        //(currentPageNo: string="", pageCapacity:string="", orderByAttribute:string="", searchForWord:string = "", searchInAttribute:string =""  )
      this._apiService.getRecords(pageNo,this.itemsPerPage).subscribe((data)=>{
        this.todoItems = [];
        this.todoItems = data;
        
        this.items = Array(this.todoItems.length).fill([], 0).map((x, i) => (this.todoItems[i]));
      });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


  loadPage(pageNo) {
    this.getDataForPagination(pageNo);
   
  }
 
}
