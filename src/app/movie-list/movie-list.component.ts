import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input()
  movies: any = [];  // list component now comes from api service, type of any
  @Output() selectMovie = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  movieClicked(movie): void {
    // console.log(movie);
    this.selectMovie.emit(movie);  // make the selected movie object accessible to parent component
  }

}
