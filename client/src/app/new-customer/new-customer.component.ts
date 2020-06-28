import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { environment } from './../../environments/environment';
import { ApiRequestService } from '../api-request.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  form;
  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiRequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      properties: new FormControl('', [this.jsonValidator(), Validators.required])
    });
  }
  enteredName;
  enteredProperties;

  jsonValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      try {
        JSON.parse(control.value);
        return null;
      } catch (error) {
        // control.setErrors(error);
        return {'jsonValidator': {value: control.value}};
      }
    };
  }

  isFormStatusValid() {
    return this.form.status == 'INVALID'
  }

  id;

  onFetchingItemSuccess(item) {
    this.enteredName = item['name']
    this.enteredProperties = item['properties']
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
        
        this.apiService.dispatchPostRequest("/api/customers/" + this.id, {}).then(
          res => {
            this.onFetchingItemSuccess(res['customer']);
        },
          msg => {})
    });
  }

  error;

  onSubmit(data) {
    // Process checkout data here
    this.form.reset();

    if (this.id) {
      data["id"] = this.id;
      this.apiService.dispatchPostRequest("/api/customers/update", {'customer': data}).then(
        res => {
          this.router.navigate(['customers'])
        },
        msg => {
          this.error = JSON.stringify(msg)
        }
      )
      return;

    } else {

      this.apiService.dispatchPostRequest("/api/customers/new", data).then( 
        res => {
          if (!res['error']) {
            this.router.navigate(['customers'])
          } else {
            this.error = JSON.stringify(res)
          }
      },
        msg => {
          this.error = JSON.stringify(msg)
      })
    }
  }
}
