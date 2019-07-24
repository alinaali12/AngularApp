import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoglevelListComponent } from './loglevel-list/loglevel-list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent

  },  
  {
    path: 'logging',
    component: LoglevelListComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate:[AuthenticationGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
