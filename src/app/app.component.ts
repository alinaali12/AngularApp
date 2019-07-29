import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { EditService } from './edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyApp';
  constructor(private _registerservice:RegisterService,private _idservice:EditService){
    this._registerservice.CheckPermissions();
  }
}
