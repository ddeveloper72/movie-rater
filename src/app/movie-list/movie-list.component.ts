import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies = ['terminator', 'predator']; // mockup api data from a service

  constructor(
    private apiService: ApiService // initialize service
  ) { }

  ngOnInit(): void {
  }

}
