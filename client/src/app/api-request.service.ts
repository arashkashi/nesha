import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})

export class ApiRequestService {

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) { }

  dispatchPostRequest(path, data, requiresAuth = true) {

    if (requiresAuth) {
      this.localStorageService.locallyStoredTokenObserver().subscribe( (token) => {
        var body = {"api_token": token, "data": data }
        return this.http.post(environment.api_endpoint + path, data)
      })
    } else {
      return this.http.post(environment.api_endpoint + path, data)
    }
  }
}
