import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private movies = ['Terminator', 'Predator']; // mockup api data from a service

  constructor() {}

  getMovies() {
    return this.movies;
  }
}
