import { NavbarService } from 'src/app/services/navbarService/navbar.service';
import { AppComponent } from './../../app.component';
import { DataService } from '../../services/dataService/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movie } from '../home/home.component';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  constructor(private dataService: DataService, public nav: NavbarService) {
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
  permissions;
  ngOnInit() {
    this.getAllMovies();
    this.nav.show();
    // const check = Array.of(JSON.parse(localStorage.getItem('permissionData')));
    // this.permissions = check[0];
    // console.log(this.permissions);

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
  download(id: number) {
    let data;
    this.dataService.downloadPoster(id).subscribe(res => {
      data = res;
      console.log(res);
      var bytes = new Uint8Array(data.byteArray); // pass your byte response to this constructor

      var blob = new Blob([bytes], { type: data.contentType });// change resultByte to bytes

      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = data.fileName + data.contentType;
      link.click();

    }, error => {
      console.log('error');
    });

  }
}
