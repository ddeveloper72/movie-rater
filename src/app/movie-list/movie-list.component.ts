import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../models/Movie';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  isLoading = false;
  subscription: Subscription;
  @Input()
  movies: Movie[] = []; // list component now comes from api service, type of Movie
  @Output() selectMovie = new EventEmitter<Movie>();
  @Output() editedMovie = new EventEmitter<Movie>();
  @Output() deletedMovie = new EventEmitter<Movie>();
  @Output() createNewMovie = new EventEmitter(); // emit an empty event

  constructor(public apiservice: ApiService) {}

  ngOnInit(): void {
    // subscribe to getMovies data from ApiService to observe when data is called
    var observable = this.apiservice.getMovies();
      // subscribe to the data so it can be unsubscribed once page is unloaded
      this.subscription = observable.subscribe(data => {
      this.isLoading = true;
    });
  }

  movieClicked(movie: Movie): void {
    // console.log(movie);
    this.selectMovie.emit(movie); // make the selected movie object accessible to parent component
  }

  editMovie(movie: Movie): void {
    this.editedMovie.emit(movie);
  }

  deleteMovie(movie: Movie): void {
    this.deletedMovie.emit(movie);
  }

  newMovie(): void {
    this.createNewMovie.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
