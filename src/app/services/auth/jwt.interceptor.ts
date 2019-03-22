import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentAuth = this.authenticationService.currentAuthValue;
        if (currentAuth && currentAuth.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentAuth.token}`
                }
            });
        }

        return next.handle(request);
    }
}