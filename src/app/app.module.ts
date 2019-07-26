import { AdminGuard } from './admin.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { RankingComponent } from './ranking/ranking.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { PagePermissionDirective } from './page-permission.directive';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [AppComponent, MoviesComponent, NavComponent,
    HomeComponent, RankingComponent, PagePermissionDirective,
    ErrorComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    })
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
