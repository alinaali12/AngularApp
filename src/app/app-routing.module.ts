import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputViewComponent } from './components/input-view/input-view.component';
import { DefaultpageComponent } from './components/defaultpage/defaultpage.component';
import { OutputviewComponent } from './components/outputview/outputview.component';
import { FunpageComponent } from './components/funpage/funpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'defaultpage',component:DefaultpageComponent,canActivate : [AuthGuard], data : {state : 'defaultpage'}},
  {path:'',component:LoginPageComponent, data : {state: 'loginpage'}},
  {path:'inputview',component:InputViewComponent, canActivate : [AuthGuard],data : {state: 'input'}},
  {path:'outputview',component:OutputviewComponent, canActivate : [AuthGuard],data : {state: 'output'}},
  {path: 'funpage', component:FunpageComponent,canActivate : [AuthGuard], data: {state: 'funpage'}},
  {path:'error',component:ErrorpageComponent,canActivate : [AuthGuard], data: {state: 'errorpage'}},
  {path:'loginpage',component:LoginPageComponent, data: {state: 'loginpage'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }