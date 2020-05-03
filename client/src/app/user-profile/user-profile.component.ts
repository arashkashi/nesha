import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from '../api-request.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private apiService: ApiRequestService) { }

  user;
  user_id;

  updateUserView(user) {
    
  }

  res;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('userId');

      this.apiService.dispatchPostRequest("/users/${this.user_id}", {}).subscribe({
        next: res => this.res = JSON.stringify(res),
        error: error => this.res = JSON.stringify(error)
      })
    });
  }
}
