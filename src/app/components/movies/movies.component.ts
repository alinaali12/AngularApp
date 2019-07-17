import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movie } from '../home/home.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Array<Movie>;
  config: any;
  sortColumn = 'Id';
  messageForm: FormGroup;
  pageActual: number = 1;
  constructor(private dataService: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.dataService.getCount()
    };
  }

  ngOnInit() {
    this.get(this.sortColumn);
  }
  pageChanged(event: any) {
    console.log(event);

    this.config.currentPage = event;
  }
  get(sort: string) {
    this.dataService.getMovies(1, 20, sort).subscribe(data => {
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
