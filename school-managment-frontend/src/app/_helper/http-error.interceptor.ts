import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    if ([401, 403].indexOf(err.status) !== -1) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        this.authService.logout();
                        this.router.navigate(['auth']);
                    }
                    //const error = err.error.message || err.statusText;
                    return throwError(err);
                })
            );
    }
}

export const httpErrorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
