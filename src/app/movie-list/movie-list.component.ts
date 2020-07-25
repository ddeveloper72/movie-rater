import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies = [];  // list component now comes from api service

  constructor(
    private apiService: ApiService // initialize service
  ) { }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      data => {
        (data: any[]) => this.movies = data;
      },
      error => console.error()

    );
  }

}
