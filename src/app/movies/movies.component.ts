import { DataService } from "./../data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  movies: Object;
  config: any;
  constructor(private data: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.data.getCount()
    };
  }

  ngOnInit() {
    console.log("count", this.data.getCount());
    this.data.getMovies().subscribe(data => {
      this.movies = data;
      console.log(this.movies);
    });
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
}
