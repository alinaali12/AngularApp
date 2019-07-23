import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../shared/models/registereduser.model';
import { RegisterService } from '../register.service';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userModel=new RegisteredUser(); 
  editU=new RegisteredUser();
  base64:string;
  imgURL: any;
  imagePath: any;
  constructor(private _registerservice:RegisterService, private _idservice: EditService) { }

  ngOnInit() {
    //console.log(this.userModel);
    this.userModel=this._idservice.get_user();
    console.log(this._idservice.get_user());
  }
  onSubmit(){
    this.userModel.id=this._idservice.get_id();
    this._registerservice.Update(this.userModel,this.userModel.id).subscribe(
      data=>console.log('success',data),
      error=>console.log('error', error)
    )
  }
  onFileChange(event) {
    this.FiletoBase64(event.target);
    this.preview(event.target);
      
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
  preview(inputValue:any) {
    var files=inputValue.files;
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.imgURL=("")
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
