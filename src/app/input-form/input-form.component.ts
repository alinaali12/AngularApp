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
  base64:string;
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
    this.FiletoBase64(event.target);
      
      
  }
  FiletoBase64(inputValue: any){
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.base64+=file.name;
      this.base64+=";";
      this.base64 += myReader.result as string;
      this.userModel.fileName=this.base64;
      //this.onSubmit();
    }
    myReader.readAsDataURL(file);
  }
    
}

  

