import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Movie } from './models/Movie';
import { AuthenticationService } from './services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient, // initialize the HttpClient
    public authenticationService: AuthenticationService
  ) {}

  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, {
      headers: this.authenticationService.getAuthHeaders()
    }); // pass headers to baseMovieUrl
  }

  // get the specific rating of a movie so the data can be refreshed dynamically after user adds rating
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseMovieUrl}${id}/`, {
      headers: this.authenticationService.getAuthHeaders()
    }); // pass headers to baseMovieUrl
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({ title, description }); // convert JSON object to string
    return this.httpClient.post(`${this.baseMovieUrl}`, body, {
      headers: this.authenticationService.getAuthHeaders()
    }); // add new body to the url
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({ title, description }); // convert JSON object to string
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {
      headers: this.authenticationService.getAuthHeaders()
    }); // add new body to the url
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, {
      headers: this.authenticationService.getAuthHeaders()
    }); // add new body to the url
  }

  rateMovie(rate: number, movieId: number) {
    const body = JSON.stringify({ stars: rate }); // information from the movie rated
    return this.httpClient.post<Movie>(
      `${this.baseMovieUrl}${movieId}/rate_movie/`,
      body,
      {
        headers: this.authenticationService.getAuthHeaders()
      }
    ); // pass headers to baseMovieUrl
  }
}
