import { Injectable } from '@angular/core';
import { StudentRegisterationModel } from './student-registeration-model';
//import {} from '@angular/material';

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
