import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ToDoItemsComponent } from './to-do-items/to-do-items.component';
import { ErrorComponent } from './error/error.component';


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

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
