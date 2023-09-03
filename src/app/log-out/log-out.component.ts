import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api-response.model';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  constructor(private apiService: ApiService) {
    this.UserLogOut();
  }

  UserLogOut() {
    this.apiService.userLogOut().subscribe(data => {
      console.log(data)
      window.location.href = window.location.href;
    });
  }
}
