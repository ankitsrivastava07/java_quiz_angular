import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
  stateChanged: any;

  constructor(private route: Router, private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.isLoading.next(true);

    const authReq = req.clone({
      headers: req.headers.set('Token', '' + sessionStorage.getItem('Token'))
    });

    return next.handle(authReq)
      .pipe(
        finalize(
          () => {
            this.loadingService.isLoading.next(false);
          }
        ),
        catchError((err: any) => {
          this.loadingService.isLoading.next(false);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Unauthorized error');
              this.route.navigate(['/signIn'])
            }

            if (err.status === 0) {
              alert('Hmmm..., the page which you are looking for does not exists or Server is currently down')
              console.log('Hmmm..., the page which you are looking for does not exists or Server is currently down');
              this.route.navigate(['/signIn'])
            }
          }
          return new Observable<HttpEvent<any>>();
        }))
  }

}
