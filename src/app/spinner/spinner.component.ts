import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerComponent {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public loading = false

  showLoader() {
    this.loading = true
  }

  hideLoader() {
    this.loading = false
  }

}
