import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName = ''

  constructor(private apiService: ApiService) {
    if (window.location.pathname !== '/signIn' && (sessionStorage.getItem('Token') !== null) && window.location.pathname !== '/signUp') {
      this.apiService.getLoginedUserName().subscribe(data => {
        this.userName = data.data.firstName;
        console.log('Logined Username ' + data.data.firstName)
      })
    }
  }
}
