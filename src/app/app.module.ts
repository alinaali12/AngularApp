import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowresultComponent } from './showresult/showresult.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { EditDataComponent } from './edit-data/edit-data.component';
import { CheckpermissionDirective } from './checkpermission.directive';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/authguard';
import { CookieService } from 'angular2-cookie/services/cookies.service';
const appRoutes: Routes = [
  { path: 'front-page', component: FrontPageComponent, canActivate: [AuthGuard] },
  { path: 'showresult', component: ShowresultComponent, canActivate: [AuthGuard]},
  { path: 'edit-data', component: EditDataComponent},
  { path: 'login', component: LoginComponent},
  { path: 'error', component: ErrorComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ShowresultComponent,
    EditDataComponent,
    CheckpermissionDirective,
    ErrorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
