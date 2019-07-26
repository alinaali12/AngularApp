export class UserLogin{
    public serial:number;
    public email:string;
    public password:string;

    public deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
    constructor(){
        this.serial=0;
        this.email="";
        this.password="";
    }
}