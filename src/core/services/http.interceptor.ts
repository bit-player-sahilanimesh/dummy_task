import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTES } from '../constants/routes';
import { LoaderService } from '../services/loader.service'; // Update path as needed

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loader: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    // Show loader before request
    this.loader.show();

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate([ROUTES.AUTH.BASE]);
        }
        return throwError(() => error);
      }),
      finalize(() => {
        // Hide loader after response completes or errors
        this.loader.hide();
      })
    );
  }
}
