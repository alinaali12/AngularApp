import { Injectable } from '@angular/core';
import { RegisteredUser } from './shared/models/registereduser.model';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  id:number;
  user:RegisteredUser=new RegisteredUser();

  constructor() { }

  set_id(id:number){
    this.id=id;
  }

  get_id(){
    return this.id;
  }
  set_user(user:RegisteredUser){
    console.log("service",this.user);
    this.user=user;
  }
  get_user(){
    console.log("service",this.user);
    return this.user;
    
  }
  
}
