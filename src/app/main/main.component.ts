import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/Movie';
import { MovieFormComponent } from '../movie-form/movie-form.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  movies: Movie[] = []; // list component now comes from api service, type of any
  selectedMovie = null;
  editedMovie = null;

  constructor(
    private apiService: ApiService // initialize service
  ) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      error => console.error()
    );
  }

  selectMovie(movie: Movie): void {
    // console.log('selectedMovie:', this.selectedMovie);
    this.selectedMovie = movie;
    this.editedMovie = null;
  }

  editMovie(movie: Movie): void {
    this.editedMovie = movie;
    this.selectedMovie = null;
  }

  deletedMovie(movie: Movie): void {
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        this.movies = this.movies.filter(mov => mov.id !== movie.id); // filter out the deleted movie id still present in the DOM
      },
      error => console.error()
    );
  }

  createNewMovie(): void {
    this.editedMovie = {
      title: '',
      description: ''
    };
    this.selectedMovie = null;
  }

  movieCreated(movie: Movie): void {
    this.movies.push(movie);
  }

  movieUpdated(movie: Movie): void {
    const indx = this.movies
    .findIndex(
      move => move.id === movie.id);  //  find id of movie in the array then assign as const indx
    if (indx >= 0) {  // check that id is valid, being number >= 0
        this.movies[indx] = movie;  // push the specific movie with the id to movie
    }
  }
}
