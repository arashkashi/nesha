import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from '../api-request.service';
import { LoginService } from '../login.service';
import { LocalStorageService} from '../local-storage.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private apiService: ApiRequestService,
    private loginService: LoginService,
    private localStore: LocalStorageService,
    private http: HttpClient) { }


  user_id;
  name;
  email;

  error;

  onFetchingUserSuccess(user) {
    this.name = user['name']
    this.email = user['email']
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('userId');

      this.res = this.user_id

      this.localStore.locallyStoredTokenObserver().subscribe( (token) => {
        var body = {"api_token": token, "data": {} }
        
        this.http.post(environment.api_endpoint + "/api/users/" + this.user_id, body).subscribe({
            next: res => this.onFetchingUserSuccess(res['user']),
            error: error => this.error = JSON.stringify(error)
          })
      })
    });
  }
}
