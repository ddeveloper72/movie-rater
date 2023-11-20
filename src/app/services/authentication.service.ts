import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public baseUrl = 'http://127.0.0.1:8000/';
  // public baseUrl = 'https://ddeveloper72-movie-rater-api.herokuapp.com/';
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {
    // BehaviorSubject is a special type of Subject that keeps hold of the current
    // value and emits it to any new subscribers as soon as they subscribe.
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  // login(user: User): Observable<User> {
  //   const body = JSON.stringify(user);
  //   return this.http
  //     .post<User>(`${this.baseUrl}auth/`, body, {
  //       headers: this.headers,
  //     })
  //     .pipe(
  //       map((result) => {
  //         // store user token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem(
  //           'currentUser',
  //           JSON.stringify({ username: user.username, token: result.token })
  //         );
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  login(user: User): Observable<User> {
  const body = JSON.stringify(user);
  return this.http
    .post<User>(`${this.baseUrl}auth/`, body, {
      headers: this.headers,
    })
    .pipe(
      map((result) => {
        // Store user token in local storage to keep the user logged in between page refreshes
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ username: user.username, token: result.token })
        );
        this.currentUserSubject.next(user);

        // Set a timer to automatically log the user out after 5 minutes
        const logoutTimer = timer(300000); // 5 minutes in milliseconds
        logoutTimer.subscribe(() => {
          // Remove user data from local storage
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null); // Clear the current user data
          this.router.navigate(['/auth']); // Navigate to the login page
        });

        return user;
      })
    );
}






  register(user: User): Observable<object> {
    // pass user object, username & password to api service headers
    const body = JSON.stringify(user);
    return this.http.post(`${this.baseUrl}api/users/`, body, {
      headers: this.headers,
    });
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getAuthHeaders(): HttpHeaders {
    // create a header for passing user token to api service
    // parse currentUser as JSON
    const clearToken = JSON.parse(localStorage.getItem('currentUser'));

    // test content of clearToken
    // console.log('getAuthHeaders', clearToken);
    // test that token is visible to headers
    // console.log('getAuthHeaders', clearToken.token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${clearToken.token}`,
    });
  }
}
