






import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from './../../environments/environment';
import { ApiRequestService } from '../api-request.service';



@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {
  registerForm;
  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiRequestService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  isFormStatusValid() {
    return this.registerForm.status == 'INVALID'
  }

  ngOnInit() {

  }

  res;

  showForm() {

  }

  onSubmit(customerData) {
    // Process checkout data here
    // this.registerForm.reset();
    this.res = this.apiService.dispatchPostRequest("/register", customerData, false).subscribe({
      next: res => this.res = JSON.stringify(res) + JSON.stringify(customerData),
      error: error => this.res = JSON.stringify(error) + JSON.stringify(customerData)
  })
  }
}