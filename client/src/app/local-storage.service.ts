import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  kUser = "userKey";
  kToken = "tokenKey";

  constructor(
    private storage: StorageMap
    ) { }

  setUserLocally(user) {
    this.storage.set(this.kUser, user).subscribe(() => {});
  }

  locallyStoredUserObserver() {
    return this.storage.get(this.kUser)
  }

  setTokenLocally(token) {
    this.storage.set(this.kToken, token).subscribe(() => {});
  }

  locallyStoredTokenObserver() {
    return this.storage.get(this.kToken)
  }
}
