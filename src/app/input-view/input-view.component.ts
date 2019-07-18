import { Component, OnInit } from '@angular/core';
import { StudentRegisterationModel } from '../student-registeration-model';
import { ApiHanlderService } from '../api-hanlder.service';
import { SiblingCommunicatorService } from '../sibling-communicator.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileBase } from '../file-base';

@Component({
  selector: 'app-input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.scss']
})

export class InputViewComponent implements OnInit {

  Title: string = "Record Manipulation"; 
  ButtonName : string ="Create Record";
  errorCheck=true;
  EditCheck = false;
  Student :StudentRegisterationModel;
  CurrentFile: FileBase = new FileBase();
  constructor(private _apiHandler: ApiHanlderService, private sharedService : SiblingCommunicatorService )  { }
 
  ngOnInit() {
    if (this.sharedService.Record!=null){

      this.Student = Object.assign({},this.sharedService.Record);  
      this.sharedService.Record=null;
      this.EditCheck=true;
      this.ButtonName='Update Record';

    }else{
      this.Student = new StudentRegisterationModel(0,'','','','',null);

    }
  }

  checkError(value: string){
    if (value==='default')
      this.errorCheck=true;
    else
     this.errorCheck=false;
  }
  fileUpload(event: { target: { files: File[]; }; }){
    var file:File = event.target.files[0];
    this.Student.filename=event.target.files[0].name;
    var fileReader:FileReader=new FileReader();
    console.log(this.Student.filename);
    fileReader.readAsDataURL(file);
    fileReader.onloadend= (event) => {
    
      console.log(fileReader.result);
      this.CurrentFile.file=fileReader.result;
      this.CurrentFile.filename=this.Student.filename;
      
    } 
  }
  onSubmit(){ // Click on Create/Update Record
 
    if (this.EditCheck==true){

      this.UpdateData(this.Student);
      this.sharedService.Record=null;
      this.EditCheck=false;

    }
    else{
      this.AddData(this.Student);
    }
    this._apiHandler.SendFile(this.CurrentFile);
  }

  async AddData(Record : StudentRegisterationModel){

     await this._apiHandler.AddRecord(Record)
     console.log("Added");
    
   }

  async UpdateData(Record : StudentRegisterationModel){

    await this._apiHandler.UpdateRecord(Record);
     console.log("Updated");
   }
}