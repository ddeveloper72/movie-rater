import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  loading = false;
  users: User[];

  constructor(
    private apiService: ApiService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  // added method for retrieving all users from api db for testing purposes
  ngOnInit(): void {
    this.loading = true;
    this.apiService
      .getUsers()
      .pipe(first())
      .subscribe(users => {
        this.loading = false;
        this.users = users;
      });
  }
}
