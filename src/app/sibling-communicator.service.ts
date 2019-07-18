import { Injectable } from '@angular/core';
import { StudentRegisterationModel } from './student-registeration-model';

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
