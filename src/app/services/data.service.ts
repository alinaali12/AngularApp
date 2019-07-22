import { Movie } from '../components/home/home.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://localhost:44347/api/Movies';
  queryUrl = '?search=';
  count;
  // ?page=3&limit=8&sort=Id
  constructor(private http: HttpClient) { }
  getMovies(page: number = 1, limit: number = this.count, sort: string = 'Id') {
    return this.http.get(
      this.baseUrl + '?page=' + page + '&limit=' + limit + '&sort=' + sort
    );
  }
  getCount() {
    this.count = this.http.get(this.baseUrl);
    return this.count;
  }
  postMovie(movie: Movie) {
    return this.http.post<Movie>(this.baseUrl, movie, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteMovie(id: number) {
    return this.http.delete<Movie>(this.baseUrl + '/' + id);
  }
}
