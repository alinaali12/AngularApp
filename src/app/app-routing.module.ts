import { HomeComponent } from "./home/home.component";
import { MoviesComponent } from "./movies/movies.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: MoviesComponent },
  { path: "home", component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
