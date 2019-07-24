import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Ilog from '../Clsses/logs';


@Injectable({
    providedIn: 'root',
    })
export default class apiservice {

    public Api = 'https://localhost:44347/api';
    public Logs_Api = `${this.Api}/LoggingErrors`;
    searchdata: any;
    page=1;
    constructor(private http: HttpClient) { }

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
}
