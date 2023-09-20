import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/Movie';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  id: number | null; // is true for new movie, but present for existing movie
  @Output() movieUpdated = new EventEmitter<Movie>();
  @Output() movieCreated = new EventEmitter<Movie>();

  movieForm: FormGroup<{
    title: FormControl;
    description: FormControl;
    imagePath: FormControl;
  }>;

  // use movieForm to render the values of the movie from the Input
  @Input() set movie(val: Movie) {
    this.id = val.id; // lets function know if movie is new or existing

    // create movie form with values from movie
    this.movieForm = new FormGroup({
      title: new FormControl<string>(val.title),
      description: new FormControl<string>(val.description),
      imagePath: new FormControl<string>(val.imagePath, [
        Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i), // Regular expression for a valid URL
      ]),
    });
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // get movie id from route
  ngOnInit(id = this.route.snapshot.paramMap.get('id')): void {
    if (id) {
      this.getMovie(); // get movie if id is present
      this.movieForm = new FormGroup({
        title: new FormControl<string>(''),
        description: new FormControl<string>(''),
        imagePath: new FormControl<string>('', [
          Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
        ]),
      });
    } else {
      // create blank movie form if id is not present
      this.movieForm = new FormGroup({
        title: new FormControl<string>(''),
        description: new FormControl<string>(''),
        imagePath: new FormControl<string>('', [
          Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
        ]),
      });
    }
  }

  getMovie(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      const movieId = Number(params.get('id')); // Convert the string to a number
      this.apiService.getMovie(movieId).subscribe((c) => {
        // show movie detail
        this.movie = c;
      });
    });
  }

  onSubmit(): void {
    console.log(this.movieForm.getRawValue());
    // evaluate if movie is existing- has an id or not, then run respective logic
    if (this.id && this.id !== null) {
      this.apiService
        .updateMovie(
          this.id,
          this.movieForm.value.title, // send value of title & value of description to ApiService
          this.movieForm.value.description,
          this.movieForm.value.imagePath
        )
        .subscribe(
          // use the defined movieForm value types as any, in the emit to the movieUpdated apiService
          (result: any = this.movieForm) => this.movieUpdated.emit(result),
          (error) => console.log(error)
        );
      alert('Movie Updated');
    } else {
      this.apiService
        .createMovie(
          this.movieForm.value.title,
          this.movieForm.value.description,
          this.movieForm.value.imagePath
        )
        .subscribe(
          // use the defined movieForm value types as any,  in the emit to the movieCreated apiService
          (result: any = this.movieForm) => this.movieCreated.emit(result),
          (error: any) => console.log(error)
        );

      alert('Movie Created');
    }
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['/movies'], { relativeTo: this.route });
  }
}
