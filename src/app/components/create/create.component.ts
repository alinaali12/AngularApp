import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/dataService/data.service';
import { FileTypeValidatorDirective } from 'src/validation-directives/file-type-validator.directive';
import { NoWhiteSpaceValidatorDirective } from 'src/validation-directives/no-white-space-validator.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    formBuilder: FormBuilder,
    private data: DataService,
    private router: Router
  ) {
    this.messageForm = formBuilder.group({
      title: ['', [Validators.required, this.removeSpaces]],
      director: ['', [Validators.required, this.removeSpaces]],
      genre: ['', [Validators.required, this.removeSpaces]],
      releaseDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      poster: ['', [Validators.required]]
    });
  }
  submitted = false;
  success = false;

  // movie: Movie;

  messageForm: FormGroup;
  poster;
  isPosted = false;
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
    // console.log(this.poster);

    this.data.postMovie(movie).subscribe(() => {
      console.log('ok');
      this.isPosted = true;
    });
  }
  removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
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
        this.poster = `${file.name}$${reader.result}`;
      };
      // console.log(reader.result);

    }
  }

  // DownloadUserFile(file) {
  //   this.fileUser.fileNames = file;
  //   console.log( this.fileUser.fileNames);
  //   this.dataservice.downloadFile(this.fileUser).subscribe(data => {
  //     this.filebase64 = data.fileNames;
  //     console.log('downloaduser', data);
  //     const name = this.filebase64.split(',');
  //     const ext = this.filebase64.split('.');
  //     console.log('base', name[0]);
  //     console.log('name', name[1]);
  //     console.log('extension', ext[1]);
  //     const obj = this.base64ToBlob(name[0], ext[1]);
  //     const url = window.URL.createObjectURL(obj);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = name[1];
  //     link.click();
  //   });
  // }

  base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    console.log(b64Data);
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
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
