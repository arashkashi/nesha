import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators, FormControl, ValidatorFn, AbstractControl, FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';
import { ApiRequestService } from '../api-request.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  selectedCustomer;
  customers = [{"id":"58e73be6-d4b4-4bc7-82b8-9db8458afc74","name":"komeili","properties":"{}","created_at":"2020-06-28T07:22:01.000000Z","updated_at":"2020-06-28T07:22:01.000000Z"}];
  numbers = [1,2,3,4,5]

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
      selectedCustomer: ['', Validators.required],
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
        
        this.apiService.dispatchPostRequest("/api/projects/" + this.id, {}).then(
          res => {
            this.onFetchingItemSuccess(res['project']);
        },
          msg => {})
    }
    );

    this.apiService.dispatchPostRequest("/api/customers", {}).then(
      res => {
        alert(JSON.stringify(res['customers']))
        this.customers = res['customers'];
    },
      msg => {}
    );
  }

  error;

  onSubmit(data) {
    // Process checkout data here
    this.form.reset();

    if (this.id) {
      data["id"] = this.id;
      this.apiService.dispatchPostRequest("/api/projects/update", {'project': data}).then(
        res => {
          this.router.navigate(['projects'])
        },
        msg => {
          this.error = JSON.stringify(msg)
        }
      )
      return;

    } else {

      this.apiService.dispatchPostRequest("/api/projects/new", data).then( 
        res => {
          if (!res['error']) {
            this.router.navigate(['projects'])
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
