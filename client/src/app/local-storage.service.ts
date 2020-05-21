import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  kToken = "kWeather";
  kUserId = "kUserID";

  constructor(
    private storage: StorageMap,
    private cookie: CookieService
    ) { }

  setTokenLocally(token) {
    this.cookie.set(this.kToken, token)
  }

  locallyStoredToken() {
    return this.cookie.get(this.kToken)
  }

  resetLocalStorage() {
    this.cookie.set(this.kToken, null)
    this.cookie.set(this.kUserId, null)
  }

  setLoggedInUserId(userId) {
    this.cookie.set(this.kUserId, userId)
  }

  loggedInUserId() {
    return this.cookie.get(this.kUserId)
  }
}
