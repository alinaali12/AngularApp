import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../shared/models/registereduser.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  userModel=new RegisteredUser(); 
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    
  }
}
