import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';

import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // constructor(private http: HttpClient) { }
  // getTodos() {
  //   return this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
  // }
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUserObservable: Observable<User | null>;

  private accessTokenSubject: BehaviorSubject<String | null>;
  public accessTokenObservable: Observable<String | null>;

  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private router: Router,
      private http: HttpClient
  ) {
    this.currentUserSubject = isPlatformBrowser(this.platformId) ? new BehaviorSubject(JSON.parse(localStorage.getItem('current_user')!)) : this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUserObservable = this.currentUserSubject.asObservable();

    this.accessTokenSubject = isPlatformBrowser(this.platformId) ? new BehaviorSubject(JSON.parse(localStorage.getItem('current_user')!)) : this.accessTokenSubject = new BehaviorSubject<String | null>(null);
    this.accessTokenObservable = this.accessTokenSubject.asObservable();
  }

  public get currentUser() {
      return this.currentUserSubject.value ?? new User();
  }

  public get accessToken() {
    return this.accessTokenSubject.value ?? "";
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(map(ret => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('current_user', JSON.stringify(ret.current_user));
        localStorage.setItem('access_token', JSON.stringify(ret.access_token));

        this.currentUserSubject.next(ret.current_user);
        this.accessTokenSubject.next(ret.access_token);

        return true;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('current_user');
    localStorage.removeItem('access_token');

    this.currentUserSubject.next(null);
    this.accessTokenSubject.next(null);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.accessTokenSubject.value == "")
      return false;

    if (this.accessTokenSubject.value == null)
      return false;
    
    return true;
  }
}
