import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  submitted = false;
  success = false;

  // movie: Movie;

  messageForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private data: DataService
  ) {
    this.messageForm = formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      poster: ['', Validators.required]
    });
  }
  ngOnInit() { }
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
    const movie = {
      title,
      director,
      genre,
      releaseDate,
      description,
      poster
    };
    this.data.postMovie(movie).subscribe(() => console.log('ok')
    );
  }



}
export class Movie {
  id?: number;
  title: string;
  director: string;

  genre: string;
  releaseDate: string;

  description: string;
  poster: string;
}
