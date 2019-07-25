import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(formBuilder: FormBuilder, private dataService: DataService) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginForm: FormGroup;
  submitted = false;
  success = false;
  authCheck;

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.success = true;
    const { email, password } = this.loginForm.value;
    const login = {
      email, password
    };
    this.dataService.getAuthorization(login).subscribe((data) => { this.authCheck = data; console.log(data); });


  }
}
export class Login {
  id?: number;
  email: string;
  password: string;

}
