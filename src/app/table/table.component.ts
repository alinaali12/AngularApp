import { Component, OnInit } from '@angular/core';
import {RegisteredUser} from "../shared/models/registereduser.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
  
})
export class TableComponent implements OnInit {

  user: RegisteredUser[];
  constructor() { 
    
  }

  ngOnInit() {
  }
  
}
