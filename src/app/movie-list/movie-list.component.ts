import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/Movie';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input()
  movies: Movie[] = [];  // list component now comes from api service, type of Movie
  @Output() selectMovie = new EventEmitter<Movie>();
  @Output() editedMovie = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {}

  movieClicked(movie: Movie): void {
    // console.log(movie);
    this.selectMovie.emit(movie);  // make the selected movie object accessible to parent component
  }

  editMovie(movie: Movie): void {
    this.editedMovie.emit(movie);
  }

}
