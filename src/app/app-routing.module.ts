import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
//import { AuthenticationGuard } from './guards/authentication.guard';
import { LoglevelListComponent } from './loglevel-list/loglevel-list.component';
import { TestPage1Component } from './test-page1/test-page1.component';
import { TestPage2Component } from './test-page2/test-page2.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent

  },  
  {
    path: 'logging',
    component: LoglevelListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'testpage1',
    component:TestPage1Component,
    canActivate:[AuthGuard]
  },
  {
    path:'testpage2',
    component:TestPage2Component,
    canActivate:[AuthGuard]
  },
  {
    path:'errorpage',
    component:ErrorPageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents=[LoglevelListComponent,TestPage1Component, TestPage2Component]