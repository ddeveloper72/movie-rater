import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies = [];  // list component now comes from api service

  constructor(
    private apiService: ApiService // initialize service
  ) { }

  ngOnInit(): void {
    this.movies = this.apiService.getMovies();
  }

}
