import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../models/Movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter<Movie>();
  rateHovered = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      this.apiService.getMovie(params.get('id')).subscribe(c => {
        // show movie detail
        // console.log(c);
        this.movie = c;
      });
    });
  }

  rateHover(rate: number): void {
    this.rateHovered = rate;
  }

  rateClicked(rate: number): void {
    this.apiService
      .rateMovie(rate, this.movie.id)
      .subscribe(result => this.getDetails(), error => console.log(error));
  }

  getDetails(): void {
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      },
      error => {
        console.log(error);
      }
    );
  }

  closeMovie(): void { // close movie details
    this.movie = null;
    this.updateMovie.emit(null);
  }

}
