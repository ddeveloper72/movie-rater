import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Movie } from '../models/Movie';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  movies: Movie[] = []; // initialize movies array

  constructor(
    private apiService: ApiService, // initialize service
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('currentUser'); // get the token at ngOnInit stage & store as constant

    if (!token) {
      this.router.navigate(['/auth']);
      console.log('Cant see currentUser 🚫', token);
    } else {
      this.apiService.getMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
        },
        (error) => console.error()
      );
    }
  }
}
