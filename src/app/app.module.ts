import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './services/Login/login-service.service';
import {CookieService} from 'ngx-cookie-service';
//import { CookieService } from 'angular2-cookie/services/cookies.service';

import { HomeComponent } from './modules/home/home.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { MatCheckboxModule } from '@angular/material';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { ToDoItemsComponent } from './modules/to-do-items/to-do-items.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { PermissionsDirective } from './directives/permissions.directive';
import { AppLoadService } from './services/onappload/app-load.service';
import { ErrorComponent } from './modules/error/error.component';
import { ResetPasswordComponent } from './modules/reset-password/reset-password.component';
/* Material design */
import {
    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModalComponent } from './modules/material-modal/material-modal.component';
import { CommonModule } from '@angular/common';



export function init_app(appLoadService : AppLoadService) {

  return() => appLoadService.getAllPermissions();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ToDoItemsComponent,
    JwPaginationComponent,
    PermissionsDirective,
    ErrorComponent,
    ResetPasswordComponent,
    MaterialModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    // Material design components
    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule
  ],
  providers: [LoginService, CookieService, AppLoadService, 
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true }], //this line helps init_app function run at the begining of app loading process
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MaterialModalComponent]
})
export class AppModule { }
