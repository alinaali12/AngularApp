import { Component, OnInit } from '@angular/core';
import { StudentRegisterationModel } from '../../models/student-registeration-model';
import { ApiHanlderService } from '../../services/api-hanlder.service';
import { SiblingCommunicatorService } from '../../services/sibling-communicator.service';
import { FileBase } from '../../models/file-base';
import  {FileDownloaderService} from '../../services/file-downloader.service';


@Component({
  selector: 'app-input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.scss']
})

export class InputViewComponent implements OnInit {
  Message: string ="";
  Title: string = "Record Manipulation"; 
  ButtonName : string ="Create Record";
  errorCheck=true;
  EditCheck = false;
  previewUrl : any = null;
  _fileType : string = null;
  Student :StudentRegisterationModel;
  CurrentFile: FileBase = new FileBase();

  constructor(private _apiHandler: ApiHanlderService, private sharedService : SiblingCommunicatorService, private _fileManager : FileDownloaderService )  { }
 
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
    if (value==='default' || value=='' || value==null)
      this.errorCheck=true;
    else
     this.errorCheck=false;
  }
  fileUpload(event: { target: { files: File[]; }; }){
    var file:File = event.target.files[0];
    this.Student.filename=event.target.files[0].name;
    var fileReader:FileReader=new FileReader();
   
    var filesize= ((file.size/1024)/1024).toFixed(4);
    console.log('FileSize:',filesize);
    if (Number(filesize) > 15){
      this.RemoveFile();
      this.Message="File Size Exceeded 15 MB";
      console.log(this.Message);
     
      var Button= document.getElementById("openModelButton");
      Button.click();
      return;
    }
    fileReader.readAsDataURL(file);
    fileReader.onloadend= (event) => {
      
      this.filePreview(fileReader.result);
      this.CurrentFile.file=fileReader.result;
      this.CurrentFile.filename=this.Student.filename;
      
    } 
  }
  RemoveFile(){
   this.Message= "File has been removed.";
   this.CurrentFile=null;
   this.previewUrl=null;
   this._fileType=null;
   this.Student.filename="";
   console.log('File Removed.');

  }
  filePreview(result : string | ArrayBuffer ){

    let RawData= result.toString();
    let base64=RawData.substring(RawData.search(':')+1,RawData.search(';'));
    this._fileType = this._fileManager.GetFileType(base64);
    
    if (this._fileType=='Image'){
      this.previewUrl=result;
    }else if (this._fileType=='Document' || this._fileType=='Spreadsheet'){
      this.previewUrl=this._fileManager.GetDocumentImage();
    }
    else {
      this.previewUrl= this._fileManager.GetDocumentImage();
    }
       
  }
  showFile(){
    if (this._fileType=='Image')
       this._fileManager.OpenFile(this.previewUrl,this.Student.filename);
    
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