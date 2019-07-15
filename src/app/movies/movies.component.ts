import { DataService } from "./../data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  movies: Object;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.movies = data;
      console.log(this.movies);
    });
  }
}
