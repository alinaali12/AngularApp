import { Component } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyApp';

  constructor(private _registerservice:RegisterService){
    this._registerservice.CheckPermissions();
  }
}
