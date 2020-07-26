import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  movies: any = []; // list component now comes from api service, type of any
  selectedMovie = null;

  constructor(
    private apiService: ApiService // initialize service
  ) {}

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => console.error()
    );
  }

  selectMovie(movie): void {
    // console.log('selectedMovie:', this.selectedMovie);
    this.selectedMovie = movie;
  }
}
