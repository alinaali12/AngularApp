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
  submitted = false;
  success = false;

  // movie: Movie;

  messageForm: FormGroup;
  poster;
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
      description
    } = this.messageForm.value;
    let { poster } = this.messageForm.value;
    poster = this.poster;
    const movie = {
      title,
      director,
      genre,
      releaseDate,
      description,
      poster
    };
    console.log(this.poster);

    this.data.postMovie(movie).subscribe(() => { console.log('ok'); console.log(this.poster); }
    );
  }
  onFileChange(event) {
    this.fileUpload(event.target);

  }
  fileUpload(event) {
    const reader = new FileReader();

    if (event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.poster = reader.result;
        this.messageForm.patchValue({
          file: reader.result

        }

        );
        console.log(reader.result);


        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
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
