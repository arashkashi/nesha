import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})

export class ApiRequestService {

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) { }

  async dispatchPostRequest(path, data, requiresAuth = true) {

    if (requiresAuth) {

      const token = await this.localStorageService.locallyStoredTokenObserver().toPromise()
      
      var dataWithToken = data;
      dataWithToken['api_token'] = token;

      return this.http.post(environment.api_endpoint + path, data).toPromise();
    } else {
      return this.http.post(environment.api_endpoint + path, data).toPromise()
    }
  }
}
