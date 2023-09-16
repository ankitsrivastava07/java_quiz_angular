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
   
    if ((sessionStorage.getItem('isLogin')!== null && sessionStorage.getItem('isLogin') === 'YES')) {
      this.apiService.getLoginedUserName().subscribe(data => {
        this.userName = data.data.firstName;
        console.log('Logined Username ' + data.data.firstName)
      })
    }
    else{
      this.userName = ''
    }
  }
}
