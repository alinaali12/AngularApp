import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import {NgxPaginationModule} from 'ngx-pagination';

import{ HttpClientModule } from '@angular/common/http';
import{ freeApiService } from './services/freeapi.services';
import { DispalyemployeeComponent } from './dispalyemployee/dispalyemployee.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UploadComponent } from './upload/upload.component';
//import {CookieService} from 'ngx-cookie-service'
import { UrlService } from './services/UrlService';
import { databind } from './services/databind';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { ChangepageDirective } from './changepage.directive';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserService } from './services/user.service';
import { AuthGuardService } from './guards/auth-guard.service';


//  const appRoutes: Routes=[

//    { path: 'create' , component: CreateEmployeeComponent}
//  ];

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    DispalyemployeeComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UploadComponent,
    ChangepageDirective,
    SignInComponent

  


 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot(),


    // RouterModule.forRoot(appRoutes)
  ],
  providers: [freeApiService, UrlService,databind , UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
