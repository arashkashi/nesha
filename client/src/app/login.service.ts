import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiRequestService } from './api-request.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  kUser = "userKey";
  kToken = "tokenKey";

  constructor(private storage: StorageMap,
              private apiService: ApiRequestService,
              private router: Router) { }

  setUserLocally(user) {
    this.storage.set(this.kUser, user).subscribe(() => {});
  }

  locallyStoredUserObserver() {
    this.storage.get(this.kUser)
  }

  setTokenLocally(token) {
    this.storage.set(this.kToken, token).subscribe(() => {});
  }

  locallyStoredTokenObserver() {
    this.storage.get(this.kToken)
  }

  loginObservable(user) {

    var username: String = user["email"];
    var password: String = user["password"];
    return this.apiService.dispatchPostRequest("/login", user, false)
  }
}
