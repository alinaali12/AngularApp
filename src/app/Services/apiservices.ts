import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Ilog from '../Clsses/logs';
import AccessControl from '../Clsses/AccessControlClass';
import { UserData } from '../Clsses/UserDataClass';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root',
    })
export default class apiservice {

    public Api = 'https://localhost:44347/api';
    public Logs_Api = `${this.Api}/LoggingErrors`;
 
    searchdata: any;
    page=1;
    check:string="false";
    countdownnumber;
    public time;
    checkk;
    public counter;
    constructor(private http: HttpClient, private router:Router , private cookieService: CookieService) { }

    getlogs(page: number=1):Observable<Array<Ilog>> {
        return this.http.get<Array<Ilog>>(`${this.Logs_Api}?pageNo=${page}`);
    }
  
    searchLogs(searchdata:String):Observable<Array<Ilog>>
    {
        return this.http.get<Array<Ilog>>(`${this.Logs_Api}?searchWith=Description&searchData=${searchdata}`);
        
    }
    remove(created:String,type:String)
    {
    
        return this.http.delete(`${this.Logs_Api}?entity=${created}&type=${type}`);
    }
    getcount()
    {
        return this.http.get(`${this.Logs_Api}/GetAll`);

    }
    sortData(name:String)
    {
        return this.http.get(`${this.Logs_Api}?sortData=${name}`)
    }
    SearchingwithData(SearchingwithD:string)
    {
        return this.http.get<Array<Ilog>>(`${this.Logs_Api}?searchWith=Type&searchData=${SearchingwithD}`);
    }
    searchwithcalender(searchingwithc:string)
    {
        return this.http.get<Array<Ilog>>(`${this.Logs_Api}?searchWith=Created&searchData=${searchingwithc}`);
    }
    AccessData()
    {
        return this.http.get<Array<AccessControl>>(`${this.Api}/Accesscontrols`);
        
    }
    EnterUser(emaill:string, pass:string)
    {
       // return this.http.get<Array<UserData>>(`${this.Api}/UserLogins?emaill=${emaill}&password=${pass}`);
       console.log(this.Api + '/UserLogins?username=' + emaill + '&password=' + pass);
       return this.http.get<string>(this.Api + '/UserLogins?username=' + emaill + '&password=' + pass );
         //  https://localhost:44347/api/UserLogins?username=sana@hotmail.com&password=bbbb
    }
    loggedIn()
    {    console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
       
    }
    // checkout()
    // {

    //   this.counter = 15; 
    //   this.countdownnumber=1800-60;
    //   var interval =  setInterval(() => {
    //     console.log(this.counter,"................");
       
    //     // localStorage.setItem("timer", this.time);
    //     // this.checkk=localStorage.getItem("timer");
    //     console.log('ccccccchhhhhhhecccckkkkk', this.checkk);

    //     this.counter--;
    //     if(this.counter < 0 )
    //     {
    //         clearInterval(interval);
    //         console.log("gre")
    //         this.router.navigate(['/login'])
    //     } 
    //     else 
    //     {
    //       if(this.countdownnumber==this.counter)
    //       {
    //         this.countdownnumber=this.countdownnumber-60;
    //         console.log('Count down Left',this.countdownnumber);
    //       }
    //       else
    //       {
    //       console.log('else',this.check);
    //       return this.check;
    //       }
    //     }
    //     return this.check;
    //   }, 1000);
    //  return interval;
    // }
}
