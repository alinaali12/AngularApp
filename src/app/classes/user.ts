

export class User {
    userEmail: string;
    stringPassword: string;
    authorizationData: string;


 constructor(username:string, pwd:string) {
     this.stringPassword = pwd;
     this.userEmail = username;
 }
}
