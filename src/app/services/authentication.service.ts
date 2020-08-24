import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public baseUrl = 'http://127.0.0.1:8000/';
  public headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {
    // BehaviorSubject is a special type of Subject that keeps hold of the current
    // value and emits it to any new subscribers as soon as they subscribe.
    // This is being used over ngx-cookie-service
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(currentUser) {
    const body = JSON.stringify(currentUser);
    return this.http.post<any>(`${this.baseUrl}auth/`, body, {headers: this.headers})
      .pipe(
        map(user => {
          // store user details as a token in local storage to keep user logged in between page refreshes
          // save the value of the key value pair, not the key: value pair to local storage
          localStorage.setItem('TokenObject', user.token);
          this.currentUserSubject.next(user);  //
          return user;
        })
      );
  }

  register(newUser) {
    const body = JSON.stringify(newUser);
    return this.http.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('TokenObject');
    this.currentUserSubject.next(null);
  }

  getAuthHeaders() {
      const token = localStorage.getItem('TokenObject');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      });
    }
}
