import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server side-error
          const errorCode = error.status;
          // JSON Response data from server: "non_field_errors"
          console.error(
            `Backend returned code ${errorCode}, ` +
              `body was: ${JSON.stringify(error.error.non_field_errors)}`
          );
          if (errorCode) {
            // option if error code === 400 do something, else if error code === something else
            // errorMessage = 'Please Check your username or password!';
            errorMessage = error.error.non_field_errors;
          }
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
