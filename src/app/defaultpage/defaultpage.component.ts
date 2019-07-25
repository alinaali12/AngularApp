import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defaultpage',
  templateUrl: './defaultpage.component.html',
  styleUrls: ['./defaultpage.component.scss']
})
export class DefaultpageComponent implements OnInit {
  public successClass="text-success";
  public hasError=false;
  public isSpecial=true;
  public messageClasses= {
    "text-success": !this.hasError,
    "text-danger": this.hasError,
    "text-special": this.isSpecial
  }
  title = 'Student Degree Registration';

  constructor() { }

  ngOnInit() {
  }

}
