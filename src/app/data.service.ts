import { Movie } from "./home/home.component";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class DataService {
  baseUrl: string = "https://localhost:44347/api/Movies";
  queryUrl: string = "?search=";
  // ?page=3&limit=8&sort=Id
  constructor(private http: HttpClient) {}
  getMovies(page: Number = 1, limit: Number = 30, sort: string = "Id") {
    return this.http.get(
      this.baseUrl + "?page=" + page + "&limit=" + limit + "&sort=" + sort
    );
    //   result = myData.map(function(obj) {
    //     return {
    //         coordinates: obj._source.coordinates,
    //         name: obj.name,
    //         population: obj.population
    //     }
    // });
  }
  getCount() {
    return this.http.get(this.baseUrl);
  }
  postMovie(movie: Movie) {
    return this.http.post<Movie>(this.baseUrl, movie, {
      headers: new HttpHeaders({
        "Content-Type": "application/xml"
      })
    });
  }
  deleteMovie(id: Number) {
    return this.http
      .delete<Movie>(this.baseUrl + "/" + id)
      .subscribe(() => console.log("user deleted", id));
    // console.log("delete dataservice", (this.baseUrl + "/" + id).toString());
  }
}
