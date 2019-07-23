import { Injectable } from '@angular/core';
import { StudentRegisterationModel } from './student-registeration-model';
//import {} from '@angular/material';
//import {PopupModule} from 'ng2-opd-popup'
@Injectable({
  providedIn: 'root'
})
export class SiblingCommunicatorService {
  Record: StudentRegisterationModel;
 

  constructor() { }
  insertData(std:StudentRegisterationModel){
    this.Record=std;
  }
}
