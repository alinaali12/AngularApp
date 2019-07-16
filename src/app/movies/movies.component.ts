import { DataService } from "./../data.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  movies: Object;
  config: any;
  sortColumn: string = "Id";
  messageForm: FormGroup;
  constructor(private data: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.data.getCount()
    };
  }

  ngOnInit() {
    this.sort(this.sortColumn);
    // console.log("count", this.data.getCount());
    // this.data.getMovies().subscribe(data => {
    //   this.movies = data;
    //   console.log(this.movies);
    // });
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  sort(sort: string) {
    this.data.getMovies(1, 5, sort).subscribe(data => {
      this.movies = data;
      console.log(this.movies);
    });
  }
  delete(id: number) {
    this.data.deleteMovie(id).remove;
    // this.sort(this.sortColumn);
    // var result = Object.keys(this.movies).map(function(key) {
    //   return [Number(key), this.movies[key]];
    // });
    // result.splice(id);
  }
}
