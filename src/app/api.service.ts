import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiResponse } from './api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = 'http://localhost:8081/public/v1/api/login'
  userInfoApi = 'http://localhost:8081/user/api/v1/'
  logOutAPI = 'http://localhost:8081/user/api/v1/userId/logOut'
  userImgUploadAPI = 'http://localhost:8081/user/api/v1/userId/uploadImg'
  userUploadFile = 'http://localhost:8081/user/api/v1/uploadPdf'
  downloadFileApi = 'http://localhost:8081/user/api/v1/downloadFile/fileName'

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

  uploadUserImgFile(file: any) {
    const uri = this.setIdMapInURI(this.userImgUploadAPI, 'userId', '' + sessionStorage.getItem('userId'));
    return this.httpCLient.post(uri, file)
  }

  setIdMapInURI(uri: string, idName: string, idValue: string) {
    uri = uri.replace(idName, idValue)
    return uri;
  }

  uploadFile(file: any) {
    return this.httpCLient.post(this.userUploadFile, file)
  }

  getFileAPI(fileName:string){
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
  
    const uri = this.setIdMapInURI(this.downloadFileApi, 'fileName', fileName)
    return this.httpCLient.get(uri, {observe:'body',responseType: 'blob'})
  }
}
