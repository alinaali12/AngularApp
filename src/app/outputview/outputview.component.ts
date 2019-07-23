import { Component, OnInit, Output } from '@angular/core';
import { StudentRegisterationModel } from '../student-registeration-model';
import { ApiHanlderService } from '../api-hanlder.service';
import { PageModel } from '../page-model';
import { SiblingCommunicatorService }  from '../sibling-communicator.service';
import { FileBase } from '../file-base';
import { FileDownloaderService } from '../file-downloader.service';

@Component({
  selector: 'app-outputview',
  templateUrl: './outputview.component.html',
  styleUrls: ['./outputview.component.scss']
})
export class OutputviewComponent implements OnInit {

  constructor(private _apiHandler: ApiHanlderService,private _sharedService : SiblingCommunicatorService,private downloadService: FileDownloaderService) { }
  ColVals = [{Name:"#",Value:"Id"}, {Name:"Name",Value:"Name"}, {Name:'Program',Value:'Program'},{Name:'Details',Value:'Detail'},{Name:'File Names',Value:'Filename'}];
  Title = "Student Records";
  _PageModel : PageModel;
  _TotalPages: number[];
  Delete_ID: number;
  SetDeleteID(id:number){
    this.Delete_ID=id;
  }
 async ngOnInit() {

    this._PageModel= new PageModel("Id",1);
    await this.setCount();
    await this.pageGet(1,"Id");
    console.log("Called");

  }
  async pageGet(pNum: number,sortBy: string ="Id",pSize:number = 5){
   
    this._PageModel.CurrentPage=pNum;
    this._PageModel.SortBy=sortBy;
    this._PageModel.PageSize=pSize;
    await this._apiHandler.GetRecords(pNum.toString(),sortBy,pSize.toString()).then(value=> this._PageModel.DataList=value); 
 // console.log(this._PageModel.DataList); 
 }

  async pageSearchGet(pNum:number=1,searchWith:string="Id",searchData="",sortBy:string="Id",pSize:number=5){

  }
   async setCount(){

   this._PageModel.setCount(await this._apiHandler.GetCount());
   this.loopCounter(this._PageModel.TotalPages);

  }
  GoToEdit(Record :StudentRegisterationModel){

   console.log('Sending to Update');
   this._sharedService.insertData(Record);

  }
 
   async DeleteData(id : any,pNum : number=1){
   console.log('Del Called',id);
      await  this._apiHandler.DeleteRecord(id);
      this.pageGet(pNum);
      console.log("Deleted");
    

  }

  async GetFile (filename : string){
    let CurrentFile : FileBase =  new FileBase;
    CurrentFile= await this._apiHandler.GetFile(filename).then(value=> CurrentFile=value);
    console.log(CurrentFile);
   this.downloadFile(CurrentFile);
  }
 
  downloadFile(File: FileBase) {
  return this.downloadService.downloadFile(File.file,File.filename);
}
  loopCounter(i: number){
    this._TotalPages=new Array(i);
  }
}
