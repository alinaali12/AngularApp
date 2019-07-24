import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputViewComponent } from './input-view/input-view.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { OutputviewComponent } from './outputview/outputview.component';
import { FunpageComponent } from './funpage/funpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

const routes: Routes = [
  {path:'defaultpage',component:DefaultpageComponent, data : {state: 'default'}},
  {path:'',component:DefaultpageComponent, data : {state: 'default'}},
  {path:'inputview',component:InputViewComponent, data : {state: 'input'}},
  {path:'outputview',component:OutputviewComponent, data : {state: 'output'}},
  {path: 'funpage', component:FunpageComponent, data: {state: 'funpage'}},
  {path:'errorpage',component:ErrorpageComponent, data: {state: 'errorpage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
