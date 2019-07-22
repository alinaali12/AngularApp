import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteAnimations} from './route-animations';

import {trigger,style,animate,group,animateChild,query,stagger,transition} from '@angular/animations'; 
import { slideInAnimation } from './route-animations.spec';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})


export class AppComponent {
  title = 'AngularApp';
  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['state'];
  }



}
