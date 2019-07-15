import { Movie } from "./home/home.component";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get("https://localhost:44347/api/Movies");
  }
  getCount() {
    return this.http.get("https://localhost:44347/api/Movies/count");
  }
  postMovie(movie: Movie) {
    return this.http.post<Movie>("https://localhost:44347/api/Movies", movie, {
      headers: new HttpHeaders({
        "Content-Type": "application/xml"
      })
    });
  }
}
