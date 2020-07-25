import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private movies = ['terminator', 'predator']; // mockup api data from a service

  constructor() {}

  getMovies() {
    return this.movies;
  }
}
