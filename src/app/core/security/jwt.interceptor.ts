import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { AuthenticationService } from '../../domain/services/authentication.service';
import { request } from 'node:http';


export const JwtInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authenticationService = inject(AuthenticationService);

  console.log("JWT Interceptors");
  const accessToken = authenticationService.accessToken;
  const isApiUrl = request.url.startsWith(environment.apiUrl);
  if (authenticationService.isLoggedIn() && isApiUrl) {
    const cloned = request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return next(cloned);  
  } 

  return next(request);
};