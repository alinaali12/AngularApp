import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { freeApiService } from '../services/freeapi.services';
import { User } from '../classes/User';
import { FormBuilder } from '@angular/forms';
// import { userInfo } from 'os';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  userForm;
  fileuploaded: string = "";
  constructor(private freeapi:freeApiService,private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      Name: '',
      Employe_Role:'',
      Address: '',
      File:''
    });
    
   }

  ngOnInit() {
   
  
  }
  saveEmployee(userinfo:User){
    userinfo.File = this.fileuploaded;
    this.freeapi.adduser(userinfo)   .subscribe(
      data=>
      {
        console.log('response result',data);
        if (data.id >0 ){
            console.log("Employee Saved");
        }
      }
    );
  }

  public uploadFile (files, userinfo: User)  {
  
    if (files.length === 0) {
      return;
    }
 
   let fileToUpload = <File>files[0];
    let formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.fileuploaded = fileToUpload.name;

    console.log(formData, files );

    userinfo.File = fileToUpload.name;

    this.freeapi.UploadFile(formData).subscribe(event => {
      console.log(event)
      if (event != undefined && event!=""){
        console.log("File uploaded ");
      }
    
    });

;

      
  }

}
