import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/Movie';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movieForm: any;
  id = null;  // is true for new movie, but present for existing movie

  // use movieForm to render the values of the movie from the Input
  @Input() set movie(val: Movie) {
    this.id = val.id;  // lets function know if move is new or existing
    console.log(this.id);
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  saveForm(): void {
    console.log(this.movieForm.value);
    // evaluate if movie is existing- has an id or not, then run respective logic
    if (this.id) {
      this.apiService
        .updateMovie(
          this.id,
          this.movieForm.value.title,  // send value of title & value of description to ApiService
          this.movieForm.value.description)
        .subscribe(
          result => console.log(result),
          error => console.log(error));
    } else {
      this.apiService
        .createMovie(
          this.movieForm.value.title, // send value of title & value of description to ApiService
          this.movieForm.value.description
        )
        .subscribe(
          result => console.log(result),
          error => console.log(error));
    }
  }
}
