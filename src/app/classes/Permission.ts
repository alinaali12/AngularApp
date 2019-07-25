export class Permission {
    Id: number;
    Pagename : string;
    pageurl: string ;
    isaccessible: boolean;  
    constructor(Id: number, Pagename: string, pageurl:string , isaccessible:boolean){
        this.Id=Id;
        this.Pagename=Pagename;
        this.pageurl=pageurl;
                this.isaccessible=isaccessible;
}}