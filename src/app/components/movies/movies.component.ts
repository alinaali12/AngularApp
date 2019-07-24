import { AppComponent } from './../../app.component';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movie } from '../home/home.component';
import { callbackify } from 'util';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  constructor(private dataService: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.count
    };
  }
  movies: Array<Movie>;
  config: any;
  sortColumn = 'Id';
  messageForm: FormGroup;
  pageActual = 1;
  count;
  sortStyle: string;

  ngOnInit() {
    this.getAllMovies();
    const check = JSON.parse(localStorage.getItem('permissionData'));
    console.log(check);

  }
  getAllMovies() {
    this.dataService.getAllMovies().subscribe((data: any) => {
      this.movies = data.data;
      this.count = data.count;
    });
  }
  pageChanged(event: any) {
    console.log(event);
    this.config.currentPage = event;
  }
  sort(sort: string) {
    this.dataService.getMovies(1, this.count, sort).subscribe(data => {
      this.movies = Object.keys(data).map(k => data[k]);
      console.log(this.movies);

    });
  }
  delete(id: number) {
    this.dataService.deleteMovie(id).subscribe(res => {
      this.movies = this.movies.filter(x => {
        return x.id !== id;
      });
    });

  }
}
