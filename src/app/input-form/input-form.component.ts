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
        localStorage.setItem('myTest', reader.result as string);
        var reReadItem = localStorage.getItem('myTest');
        console.log(reReadItem);
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
