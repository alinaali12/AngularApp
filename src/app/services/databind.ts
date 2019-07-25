import { Permission } from '../classes/Permission';
import { User } from '../classes/User';

export class databind{
    Record:  User;
    Urls : Permission [];
    constructor() { }
  insertData(emp:User){
    this.Record=emp;
  }
    
}