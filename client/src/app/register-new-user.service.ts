import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterNewUserService {
  api_token;

  constructor(
    private http: HttpClient
  ) { }

  register(fullname, email, password, confirm_pass) {

  }
}
