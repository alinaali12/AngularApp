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
  base64:string;
  constructor(private _registerservice:RegisterService, private _idservice: EditService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.userModel.id=this._idservice.get_id();
    this._registerservice.Update(this.userModel,this.userModel.id).subscribe(
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
      if(file.type=="text/plain"){
        reader.readAsText(file);
        console.log(reader.result);
      }
      if(file.type=="image/jpeg"){
        reader.readAsDataURL(file);
        //console.log(reReadItem);
      }
      
      
    }
    
    
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }

}
