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
import {CookieService} from 'ngx-cookie-service'
import { UrlService } from './services/UrlService';
import { databind } from './services/databind';
import {NgxWebstorageModule} from 'ngx-webstorage';

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
    UploadComponent
  


 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot(),


    // RouterModule.forRoot(appRoutes)
  ],
  providers: [freeApiService, CookieService, UrlService,databind ],
  bootstrap: [AppComponent]
})

export class AppModule { }
