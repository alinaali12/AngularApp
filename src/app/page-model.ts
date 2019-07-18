import { StudentRegisterationModel } from './student-registeration-model';

export class PageModel {
    constructor(SortBy:string ="Id",CurrentPage:number=1,Count:number=0,PageSize:number=5,DataList?:StudentRegisterationModel[]){
        this.SortBy=SortBy;
        this.CurrentPage=CurrentPage;
        this.PageSize=PageSize;
        this.DataList=DataList;
        this.Count=Count;
    }
    SortBy: string 
    CurrentPage: number 
    Count : number ;
    PageSize : number 
    DataList : StudentRegisterationModel[] ;
    TotalPages : number;
   public setCount(val: number){ 
        this.Count=val;
        this.calc_TotalPages();
    }
    calc_TotalPages(){
        this.TotalPages= Math.ceil(this.Count/this.PageSize);
     //   console.log('Pages:',this.TotalPages);
    };
    
 
}
