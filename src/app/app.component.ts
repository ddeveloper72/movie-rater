import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './models/Movie';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = []; // list component now comes from api service, type of any

  constructor(
    private apiService: ApiService, // initialize service
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token'); // get the token at ngOnInit stage & store as constant

    // redirect if no token to auth, else if token, show movies
    if (!mrToken) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
        },
        error => console.error()
      );
    }
  }

  logoutUser(): void {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
  }
}
