import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
