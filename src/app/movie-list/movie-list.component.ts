import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/Movie';
import { IsLoadingService } from '../services/is-loading.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  isLoading: Observable<boolean>;
  @Input()
  movies: Movie[] = []; // list component now comes from api service, type of Movie
  @Output() selectMovie = new EventEmitter<Movie>();
  @Output() editedMovie = new EventEmitter<Movie>();
  @Output() deletedMovie = new EventEmitter<Movie>();
  @Output() createNewMovie = new EventEmitter(); // emit an empty event

  constructor(
    private isLoadingService: IsLoadingService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.isLoadingService.isLoading$();
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
}
