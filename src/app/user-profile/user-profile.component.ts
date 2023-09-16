import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  imgSrc: any = 'https://media.tenor.com/PfFDd3eNE_gAAAAi/loading-load.gif'
  userDetail: any
  data: any
  uploadedFileName = ''

  constructor(private apiService: ApiService, private httClient: HttpClient) {
    apiService.getUserDetail().subscribe(data => {
      this.userDetail = data.data;
      this.data = data;
      this.imgSrc = this.userDetail.fileDto.fileAccessURL;
      this.uploadedFileName = this.userDetail.fileDto.fileName;
      console.log('file data ' + JSON.stringify(this.userDetail.fileDto))
      console.log('User Detail ' + data);
    });
  }

  createFilePath(event: any) {
    this.data = ''
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;

    const file: File = event.target.files[0];

    this.uploadedFileName = event.target.files[0].name;

    const formData = new FormData();

    formData.append("file", file);

    this.apiService.uploadUserImgFile(formData).subscribe(data => {
      console.log(data)
      this.data = data
    });
    console.log('file ' + reader.readAsDataURL(file))
  }

  uploadFile(event: any) {
    const reader = new FileReader();
    // reader.onload = e => this.imgSrc = reader.result;

    const file: File = event.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    this.apiService.uploadFile(formData).subscribe(data => {
      console.log(data)
    });
    console.log('file ' + reader.readAsDataURL(file))
  }

  downLoadFile() {
    console.log('file download ')
    this.apiService.getFileAPI(this.uploadedFileName)
      .subscribe(data => {
        var binaryData = [];
        binaryData.push(data);

        var downloadURL = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/octet-stream' }))
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.uploadedFileName;
        link.click();
      },catchError(eerr=> eerr) 
      );
  }
}
