import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputFormComponent } from './input-form/input-form.component';
import { TableComponent } from './table/table.component';
import { EditComponent } from './edit/edit.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { CheckAccessDirective } from './check-access.directive';
import { ErrorComponent } from './error/error.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {AuthGuard} from './auth.guard';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputFormComponent,
    TableComponent,
    EditComponent,
    SafeUrlPipe,
    CheckAccessDirective,
    ErrorComponent,
    LoginPageComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    
  ],
  providers:[AuthGuard,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
