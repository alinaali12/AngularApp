import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputViewComponent } from './input-view/input-view.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { OutputviewComponent } from './outputview/outputview.component';
import { FocuschangeDirective } from './focuschange.directive';
import { HttpClientModule } from '@angular/common/http';
import { SiblingCommunicatorService } from './sibling-communicator.service';
import { ClasschangerDirective } from './classchanger.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FunpageComponent } from './funpage/funpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { PagecheckDirective } from './pagecheck.directive';
import { CookieService } from 'ngx-cookie-service';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InputViewComponent,
    DefaultpageComponent,
    OutputviewComponent,
    FocuschangeDirective,
    ClasschangerDirective,
    ConfirmDialogComponent,
    FunpageComponent,
    ErrorpageComponent,
    PagecheckDirective,
    LoginPageComponent    
   
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   
  ],
  providers: [SiblingCommunicatorService,CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
