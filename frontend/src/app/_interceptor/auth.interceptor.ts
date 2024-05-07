import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {StorageService} from "../_services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getUser();
    console.log('ff');
    if (token['token']) {
      const cloned = req.clone({
        setHeaders: {
          Authorization:  `Bearer ${token['token']}`
        }
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          const currentTime = new Date();
          if (error && error.status === 403 && this.storageService.getExpirationDate() < currentTime) {
            this.storageService.logout();
          }
          return throwError(() => new Error(error.message || 'An unknown error occurred'));
        })
      );
    }
    return next.handle(req);
  }
}
