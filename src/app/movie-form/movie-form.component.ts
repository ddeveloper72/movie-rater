import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @Input() movie: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
