import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private access_tokenSubject: BehaviorSubject<String>;
    public access_token: Observable<String>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || ""));
        this.currentUser = this.currentUserSubject.asObservable();
        this.access_tokenSubject = new BehaviorSubject<String>(localStorage.getItem('access_token') || "");
        this.access_token = this.access_tokenSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { "username": username, "password": password })
            .pipe(map(ret => {
                console.log(ret);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(ret.me));
                localStorage.setItem('access_token', JSON.stringify(ret.token));
                this.currentUserSubject.next(ret.me);
                this.access_tokenSubject.next(ret.token);
                return true;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
    }
}