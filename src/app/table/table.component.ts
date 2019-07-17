import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
  
})
export class TableComponent implements OnInit {

  user: Object;
  TotalPages:any;
  fakearray;
  constructor(private _registerservice:RegisterService, private _idservice:EditService) {}

  ngOnInit() {
    this._registerservice.ViewAll().subscribe(data => {
      this.user = data
    });
    this._registerservice.GetCount().subscribe(data=> {
      this.TotalPages=data
      this.fakearray=new Array(Math.ceil(this.TotalPages/5))
    }) 
  }
  Sort(value:string){
    this._registerservice.SortBy(value).subscribe(data => {
      this.user = data
    }); 
  }
  GetPage(pageno:number){
    this._registerservice.GetPage(pageno).subscribe(data => {
      this.user = data
    });
  }

  DeleteEntry(id:number){
    this._registerservice.Delete(id).subscribe(data=>{console.log(data)
    this.ngOnInit()
    });
  }
  
  set_edit(id:number){
    this._idservice.set_id(id);
  }
}
