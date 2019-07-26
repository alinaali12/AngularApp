import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentRegisterationModel } from '../models/student-registeration-model';
import { FileBase } from '../models/file-base'

@Injectable({
  providedIn: 'root'
})
export class ApiHanlderService {
  BaseUrl='https://localhost:44347/api/';
  ModelName: string = "StudentRegisterations";
  GetVal : string ="GetAll";

  pageNo: string ;
  sortBy: string ;
  pageSize: string ;
  searchWith:string;
  searchData: string;

  _url= this.BaseUrl+this.ModelName;

  SetQueryVals(pageNo:string="pageNo",searchWith:string="searchWith",searchData:string="searchData", sortBy:string="sortData",pageSize:string="pageSize"){
    this.pageNo=pageNo;
    this.sortBy=sortBy;
    this.pageSize=pageSize;
    this.searchWith=searchWith;
    this.searchData=searchData;
  }
  constructor(private _http: HttpClient) { 
    this.SetQueryVals();
  }
  async DeleteRecord(id:number): Promise<any>{
    return await this._http.delete(this._url+"/"+id.toString()).toPromise();
  }
  async SendFile (file : FileBase ){
    console.log(file);
    await this._http.post(this._url+"/"+"SetFile",file).toPromise();
    console.log("File Sent.");
  }
  async GetFile (filename: string): Promise<any>{
    return await this._http.get<ArrayBuffer | string>(this._url+"/"+"GetFile"+"/"+filename).toPromise();
    
  }
 async AddRecord (std: StudentRegisterationModel):Promise<any>{
   return await  this._http.post<any>(this._url,std).toPromise();
  }
  async UpdateRecord(std: StudentRegisterationModel) :Promise<any>{
    return await this._http.put(this._url+"/"+std.id.toString(),std).toPromise();
  }
  async GetRecords(pNum: string,sBy:string="Id",pSize:string="5") : Promise<StudentRegisterationModel[]>{
    let DataList : StudentRegisterationModel[];
    let query : string =  (this.pageNo+"="+pNum+"&"+this.sortBy+"="+sBy+"&"+this.pageSize+"="+pSize);
   //Add try catch
    console.log(this._url+'?'+query);
    return await this._http.get<StudentRegisterationModel[]>(this._url+'?'+query).toPromise();
   }
  // async SearchRecords(pNum: string, sBy:string="I")

  async GetCount (): Promise<number>{
    let Response= await this._http.get<number>(this._url+"/"+this.GetVal).toPromise();
    return (Response as number-1);
  }
}
