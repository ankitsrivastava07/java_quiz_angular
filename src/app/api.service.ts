import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = 'http://localhost:8081/public/v1/api/login'
  userInfoApi = 'http://localhost:8081/api/v1/user/'
  logOutAPI = 'http://localhost:8081/api/v1/user/userId/logOut'

  constructor(private httpCLient: HttpClient) { }

  userLogin(data: any) {
    return this.httpCLient.post<ApiResponse>(this.api, data);
  }

  getLoginedUserName() {
    return this.httpCLient.get<ApiResponse>(this.userInfoApi + sessionStorage.getItem('userId'))
  }

  userLogOut() {
   this.logOutAPI = this.logOutAPI.replace('userId', '' + sessionStorage.getItem('userId'))
   console.log(this.logOutAPI)
   return this.httpCLient.get<ApiResponse>(this.logOutAPI);
  }

  getUserDetail() {
    return this.httpCLient.get<ApiResponse>(this.userInfoApi + sessionStorage.getItem('userId'))
  }
}
