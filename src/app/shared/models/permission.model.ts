export class PermissionObj{
    public serial:number;
    public siteName:string;
    public siteUrl:string;
    public access:boolean;

    public deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
    constructor(){
        this.serial=0;
        this.siteName="";
        this.siteUrl="";
        this.access=false;
    }
}