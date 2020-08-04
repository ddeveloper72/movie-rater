import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/Movie';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm;

  // use movieForm to render the values of the movie from the Input
  @Input() set movie(val: Movie) {
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }

  constructor() {}

  ngOnInit(): void {}

  saveForm(): void {
    console.log(this.movieForm.value);
  }
}
