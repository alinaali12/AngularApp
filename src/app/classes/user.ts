

export class User {
 userName: string;
 plainPassword: string;
 authorizationData: string;


 constructor(username:string, pwd:string) {
     this.plainPassword = pwd;
     this.userName = username;
 }
}
