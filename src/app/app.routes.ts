import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent }, //if login path provided then display login page
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //default route
];