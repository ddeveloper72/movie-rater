import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.Token
  });

  constructor(
    private httpClient: HttpClient // initialize the HttpClient
  ) {}

  getMovies() {
    return this.httpClient.get(this.baseUrl, {headers: this.headers});  // pass headers to baseUrl
  }

  rateMovie(rate: number, movieId: number) {
    return this.httpClient.post(this.baseUrl, {headers: this.headers});  // pass headers to baseUrl
  }
}
