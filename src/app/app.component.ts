import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private apiService: ApiService, // initialize service
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token'); // get the token at ngOnInit stage & store as constant
  }

  logoutUser(): void {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/home']);
  }
}
