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

  constructor(private apiService: ApiService, private router: Router) { }

  loginFormApi(loginFormData: any) {
    this.isValidCrds = false
    this.apiService.userLogin(loginFormData).subscribe(data => {
      this.isValidCrds = true
      this.errMsg = data.msg
      this.apiResponse = data;
      console.log(data)

      if (data.status === true) {
        window.sessionStorage.setItem('Token', this.apiResponse.data.sessionToken)
        sessionStorage.setItem('userName', this.apiResponse.data.userName)
        sessionStorage.setItem('userId', data.data.userId)

        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
      }

    });
    console.log(loginFormData)
  }
}
