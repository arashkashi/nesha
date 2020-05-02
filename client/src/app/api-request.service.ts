import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestService {

  constructor(private http: HttpClient) { }

  dispatchPostRequest(path, data, requiresAuth = true) {

    if (requiresAuth) {

    } else {
      // const headers = {
      //   'Content-Type':  'application/json'
      // }
      return this.http.post(environment.api_endpoint + path, data)
    }
  }
}
