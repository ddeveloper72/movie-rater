import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Movie } from './models/Movie';

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
    return this.httpClient.get<Movie[]>(this.baseUrl, {headers: this.headers});  // pass headers to baseUrl
  }


  // get the specific rating of a movie so the data can be refreshed dynamically after user adds rating
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseUrl}${id}/`, { headers: this.headers });  // pass headers to baseUrl
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({ title, description });  // convert JSON object to string
    return this.httpClient.post(`${this.baseUrl}/`, body, { headers: this.headers });  // add new body to the url
  }

  rateMovie(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});  // information from the movie rated
    return this.httpClient.post<Movie>(`${this.baseUrl}${movieId}/rate_movie/`, body, {
      headers: this.headers
    });  // pass headers to baseUrl
  }
}
