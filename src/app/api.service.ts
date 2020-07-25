import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = 'http://127.0.0.1:8000/api/movies/';

  private movies = ['Terminator', 'Predator']; // mockup api data from a service

  constructor() {}

  getMovies() {
    return this.movies;
  }
}
