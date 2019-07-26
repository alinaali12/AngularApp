export class Permission_URL {
    id: number;
    name: string;
    url: string ;
    permission: boolean;  
    constructor(id: number, name: string, url:string , permission:boolean){
        this.id=id;
        this.name=name;
        this.url=url;
        this.permission=permission;
    }
}
