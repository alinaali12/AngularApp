import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

import { HomeComponent } from './modules/home/home.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ToDoItemsComponent } from './modules/to-do-items/to-do-items.component';
import { ErrorComponent } from './modules/error/error.component';
import { ResetPasswordComponent } from './modules/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent

  },
  {
    path:'home',
    component: HomeComponent,
    canActivate:[AuthenticationGuard]

  },
  {
    path:'todoitems',
    component: ToDoItemsComponent,
    canActivate:[AuthenticationGuard]

  },
  {
    path:'error',
    component: ErrorComponent,
    canActivate:[AuthenticationGuard]

  },
  {
    path:'resetpassword',
    component: ResetPasswordComponent
   // data : {userEmail : ''}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
