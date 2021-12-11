import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/Movie';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movieForm: any;
  id: number | null; // is true for new movie, but present for existing movie
  editMode: false;

  // use movieForm to render the values of the movie from the Input
  @Input() set movie(val: Movie) {
    this.id = val.id; // lets function know if move is new or existing

    this.movieForm = new FormGroup({
      title: new FormControl(val.title, Validators.minLength(2)),
      description: new FormControl(val.description, Validators.minLength(30)),
      imagePath: new FormControl(val.imagePath)
    });
  }


  @Output() movieUpdated = new EventEmitter<Movie>();
  @Output() movieCreated = new EventEmitter<Movie>();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.apiService.getMovie(params.get('id')).subscribe(c => {
        this.movie = c;
      });
    });
  }

  saveForm(): void {
    console.log(this.movieForm.value);
    // evaluate if movie is existing- has an id or not, then run respective logic
    if (this.id) {
      this.apiService
        .updateMovie(
          this.id,
          this.movieForm.value.title, // send value of title & value of description to ApiService
          this.movieForm.value.description,
          this.movieForm.value.imagePath
        )
        .subscribe(
          (result: Movie) => this.movieUpdated.emit(result),
          error => console.log(error)
        );
    } else {
      this.apiService
        .createMovie(
          this.movieForm.value.title, // send value of title & value of description to ApiService
          this.movieForm.value.description,
          this.movieForm.value.imagePath
        )
        .subscribe(
          (result: Movie) => this.movieCreated.emit(result),
          error => console.log(error)
        );
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['/movies'], { relativeTo: this.route });
  }
}
