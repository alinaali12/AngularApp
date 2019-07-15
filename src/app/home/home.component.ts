import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "../data.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  submitted: Boolean = false;
  success: Boolean = false;

  // movie: Movie;

  messageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private data: DataService
  ) {
    this.messageForm = formBuilder.group({
      title: ["", Validators.required],
      director: ["", Validators.required],
      genre: ["", Validators.required],
      releaseDate: ["", Validators.required],
      description: ["", Validators.required],
      poster: ["", Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;
    const {
      title,
      director,
      genre,
      releaseDate,
      description,
      poster
    } = this.messageForm.value;
    let movie = {
      title,
      director,
      genre,
      releaseDate,
      description,
      poster
    };
    this.data.postMovie(movie);
  }

  ngOnInit() {}
}
export class Movie {
  title: string;
  director: string;

  genre: string;
  releaseDate: string;

  description: string;
  poster: string;
}
