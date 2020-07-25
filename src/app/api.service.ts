import { Injectable } from '@angular/core';
import { HttpClinet, Httpheaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';

  private movies = ['Terminator', 'Predator']; // mockup api data from a service

  constructor(
    private httpClient: HttpClient // initialize the HttpClient
  ) {}

  getMovies() {
    return this.movies;
  }
}
