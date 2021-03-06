import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { User } from './models/User';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
}
