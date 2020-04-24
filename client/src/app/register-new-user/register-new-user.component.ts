






import { Component, OnInit } from '@angular/core';
import { FormBuilder  } from '@angular/forms';


@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {
  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      password: '',
      confirm_password: ''
    });
  }

  ngOnInit() {

  }

  onSubmit(customerData) {
    // Process checkout data here
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }
}