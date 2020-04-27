






import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from './../../environments/environment';



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
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  isFormStatusValid() {
    return this.registerForm.status == 'INVALID'
  }

  ngOnInit() {

  }

  onSubmit(customerData) {
    // Process checkout data here
    this.registerForm.reset();

    console.warn('Your order has been submitted', customerData);
  }
}