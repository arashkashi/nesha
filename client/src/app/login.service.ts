import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiRequestService) { }

  loginObservable(user) {
    return this.apiService.dispatchPostRequest("/login", user, false)
  }
}
