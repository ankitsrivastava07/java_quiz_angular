import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  isValidCrds = false
  errMsg = ''
  apiResponse: any
  responseMsg:string = ''

  constructor(private apiService: ApiService, private router: Router) { }

  loginFormApi(loginFormData: any) {
    this.responseMsg = ''
    this.apiService.userLogin(loginFormData).subscribe(data => {
      this.responseMsg = data.msg
      this.apiResponse = data;
      console.log(data)

      if (data.status === true) {
        window.sessionStorage.setItem('Token', this.apiResponse.data.sessionToken)
        sessionStorage.setItem('userName', this.apiResponse.data.userName)
        sessionStorage.setItem('userId', data.data.userId)
        sessionStorage.setItem('isLogin', 'YES')
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
      }

    });
    console.log(loginFormData)
  }
}
