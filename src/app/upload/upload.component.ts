
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User } from '../classes/User';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
 
  constructor(private http: HttpClient) { }
 
  ngOnInit() {
  }
 
  DownloadFile(){
   
  }
}