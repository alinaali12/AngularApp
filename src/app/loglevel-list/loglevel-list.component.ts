import { Component, OnInit } from '@angular/core';
import Ilog from '../Clsses/logs';
import apiservice from '../Services/apiservices';
import { DatePipe } from '@angular/common';
import DateTime from '../Clsses/DateTime';

@Component({
  selector: 'app-loglevel-list',
  templateUrl: './loglevel-list.component.html',
  styleUrls: ['./loglevel-list.component.scss']
})
export class LoglevelListComponent implements OnInit {
logss:Array<Ilog>
checkDateTime:Array<DateTime>
delres;
pagenumber;
countt;
count=[];
active;
sortdata;
dateee;
TimeToShow;
TimeFormat;
datsplit;
SearchingData;
changeformat;
DateToShow;
Searchingcalender;
searchdateformat;
value;
datasplit;
pipe = new DatePipe('en-US');
constructor(private apiservice:apiservice, private datePipe:DatePipe) {
  
 }

  ngOnInit() {
  // this.apiservice.checkout();
  // console.log("counter = ",this.apiservice.counter);
   console.log('I am in Logging Compoenentttt');
    this.apiservice.getlogs(this.pagenumber).subscribe(data=>{
      console.log('Response result',this.logss=data);
      this.GetCount();
      this.dateTime();
      this.checkingDateTime();
    });
  }

  checkingDateTime(){
    this.apiservice.getlogs(this.pagenumber).subscribe(data=>{
      console.log('checkDateTimeeeeeeeee',this.checkDateTime=data);
  });
  }
    searchLogs(){
    
     // console.log(this.SearchingData);
      this.apiservice.searchLogs(this.value).subscribe(data=>{
        console.log('Response result1',this.logss=data);
      });
    
  }
  searchingData()
  {
    this.apiservice.SearchingwithData(this.SearchingData).subscribe(data=>
      {
        console.log('aaaaaaaaaaaaaaaaaa',this.logss=data);

      });
      this.dateTime();
  }
  searchingWithCalender(){
    console.log(this.Searchingcalender);
    this.searchdateformat=this.pipe.transform(this.Searchingcalender,'dd-MM-yyyy');
    console.log(this.searchdateformat);
    this.apiservice.searchwithcalender(this.searchdateformat).subscribe(data=>
      {
        console.log('bbbbbbbbbbbbbbb',this.logss=data);
      });
  }

  remove(data){
    console.log('aaaaaaaabbbbbb',data);
    this.datasplit=data.id;
    console.log('DaTa Splittt', this.datasplit);
    for(let i = 0; i < this.checkDateTime.length; i++)
    {
      if(this.datasplit===this.checkDateTime[i].id)
      {
        this.apiservice.remove(this.checkDateTime[i].created,this.checkDateTime[i].type).subscribe
        (
          data=>{
            this.delres=data;
            console.log('Delete result',this.delres);
            this.ngOnInit();
          }
        )
      }
    }
  }
  getPageData(pageNo)
  {
    this.active=pageNo;
    this.pagenumber=pageNo;
    this.ngOnInit();
  }
  GetCount()
  {
    this.apiservice.getcount().subscribe(data=>
      {
        this.countt=data;
        this.countt=this.countt/5;
        this.count=new Array (Math.ceil(this.countt));
      //  this.count[Math.ceil(this.countt)];

        console.log('Total records',this.countt);
        console.log(Math.ceil(this.countt));
        console.log('array',this.count.length);
      });
  }
  sort(name:string)
  {
    this.apiservice.sortData(name).subscribe(data=>{
      this.sortdata=data;
      console.log('Sort with',this.sortdata);
      this.logss=this.sortdata;
      this.dateTime();
    });
  }
  ShowandHide(id:number)
  {
    this.ngOnInit();
  }
  dateTime()
  {
    for(let i = 0; i < this.logss.length; i++)
   {
    
    this.datsplit=this.logss[i].created.split(" ");
    this.changeformat=this.datsplit[0].split('/');
    this.DateToShow=this.changeformat[1] + '/' +this.changeformat[0]+'/'+this.changeformat[2];
    console.log(this.DateToShow);
    this.dateee= this.datePipe.transform(this.DateToShow,'longDate');
    console.log(this.dateee);
   

    console.log('Timee',this.datsplit[1]);
    this.TimeFormat=this.datsplit[1].split(':');
    console.log(this.TimeFormat);
    this.TimeToShow=this.TimeFormat[0]+':'+this.TimeFormat[1];
    console.log('timee',this.TimeToShow);
    this.logss[i].created=this.dateee+'\n '+this.TimeToShow;
   
    }
  }
  checkstatus()
  {
    status="clicked";
  }
  
}
  
