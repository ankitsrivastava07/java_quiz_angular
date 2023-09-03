import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  userDetail:any
  constructor(private apiService: ApiService) {
    apiService.getUserDetail().subscribe(data => {
      this.userDetail = data.data;
      console.log('User Detail '+data);
    });
  }
}
