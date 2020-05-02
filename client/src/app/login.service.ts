import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userKey = "userKey";

  constructor(private storage: StorageMap) { }

  locallySetUser(user) {
    this.storage.set(this.userKey, user).subscribe(() => {});
  }

  getLocalUser() {
    this.storage.get(this.userKey).subscribe((user) => {
      return user;
    });
  }
}
