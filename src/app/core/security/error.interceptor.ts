import { inject } from '@angular/core';
import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environment/environment';
import { AuthenticationService } from '../../domain/services/authentication.service';

export const ErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
   
    const authenticationService: AuthenticationService = inject(AuthenticationService);
    console.log("ErrorInterceptor");
    
    return next(request).pipe(catchError((err) => {
        if ([401, 403].includes(err.status)) {
            authenticationService.logout()
        }

        const error = err.error.message || err.statusText;
        return throwError(() => error)
    }))

}