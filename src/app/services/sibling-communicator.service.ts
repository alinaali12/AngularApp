import { Injectable } from '@angular/core';
import { StudentRegisterationModel } from '../models/student-registeration-model';
import { Permission_URL } from '../models/Permission_URL';

@Injectable({
  providedIn: 'root'
})
export class SiblingCommunicatorService {
  Record: StudentRegisterationModel;
  Urls : Permission_URL [];
  LoggedIn: boolean;

  constructor() { }
  insertData(std:StudentRegisterationModel){
    this.Record=std;
  }
}
