import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputViewComponent } from './components/input-view/input-view.component';
import { DefaultpageComponent } from './components/defaultpage/defaultpage.component';
import { OutputviewComponent } from './components/outputview/outputview.component';
import { FocuschangeDirective } from './directives/focuschange.directive';
import { HttpClientModule } from '@angular/common/http';
import { SiblingCommunicatorService } from './services/sibling-communicator.service';
import { ClasschangerDirective } from './directives/classchanger.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FunpageComponent } from './components/funpage/funpage.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { PagecheckDirective } from './directives/pagecheck.directive';
import { CookieService } from 'ngx-cookie-service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { MaterialWrapperModule } from './material-wrapper/material-wrapper.module';


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
    LoginPageComponent,
   
 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialWrapperModule
   
  ],
  providers: [SiblingCommunicatorService,CookieService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
