import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../shared/models/registereduser.model';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  userModel=new RegisteredUser(); 
  base64="empty";
  constructor(private _registerservice:RegisterService) { }

  ngOnInit() {
  }
  onSubmit(){
    this._registerservice.Register(this.userModel).subscribe(
      data=>console.log('success',data),
      error=>console.log('error', error)
    )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      //reader.readAsDataURL(file);
      console.log(file.name);
      console.log(file.type);
      reader.onload = () => {
        //console.log(reader.result);
      };
      reader.readAsDataURL(file);
      this.base64=reader.result as string;
      
    }
    
    
  }

  

  
}
