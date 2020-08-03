import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  movies: Movie[] = []; // list component now comes from api service, type of any
  selectedMovie = null;
  editMovie = null;

  constructor(
    private apiService: ApiService // initialize service
  ) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      (data: Movie[] ) => {
        this.movies = data;
      },
      error => console.error()
    );
  }

  selectMovie(movie: Movie): void {
    // console.log('selectedMovie:', this.selectedMovie);
    this.selectedMovie = movie;
  }
}
