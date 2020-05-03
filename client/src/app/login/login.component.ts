import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { LoginService } from '../login.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder,
              ) {
                this.loginForm = this.formBuilder.group({
                  email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
                  password: ['', Validators.required],
                });
               }
  error;
  registerForm;
  environment = environment;

  ngOnInit(): void {
  }

  onSuccessfulLogin(login_response) {
    var api_token: String = login_response['api_token']
    var user = login_response['user']
    var user_id = user['uuid']

    this.loginService.setUserLocally(user)
    this.loginService.setTokenLocally(api_token)

    this.router.navigate(['users/${user_id}']);
  }

  onSubmit(customerData) {

    this.loginService.loginObservable(customerData).subscribe({
      next: res => this.onSuccessfulLogin(res),
      error: error => this.error = JSON.stringify(error)
    }
  )
  }
}
