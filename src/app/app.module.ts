import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {FormsModule} from '@angular/forms';
import {Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './login-service.service';
import {CookieService} from 'ngx-cookie-service';
//import { CookieService } from 'angular2-cookie/services/cookies.service';
import{enableProdMode} from '@angular/core';
enableProdMode();
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {  AppRoutingModule  , RoutingComponents} from './app-routing.module';
import { CheckAccessDirective } from './check-access.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { EncrDecrServiceService } from '../app/encr-decr-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RoutingComponents,
    CheckAccessDirective,
    ErrorPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [LoginService, CookieService, DatePipe, AuthGuard, CookieService, EncrDecrServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
