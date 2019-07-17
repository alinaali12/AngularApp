import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  id:number;
  constructor() { }

  set_id(id:number){
    this.id=id;
  }

  get_id(){
    return this.id;
  }
}
