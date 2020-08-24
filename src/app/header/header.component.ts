import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
