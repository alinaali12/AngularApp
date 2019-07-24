import { Injectable } from '@angular/core';
import { StudentRegisterationModel } from './student-registeration-model';
import { Permission_URL } from './Permission_URL';

@Injectable({
  providedIn: 'root'
})
export class SiblingCommunicatorService {
  Record: StudentRegisterationModel;
  Urls : Permission_URL [];
  

  constructor() { }
  insertData(std:StudentRegisterationModel){
    this.Record=std;
  }
}
