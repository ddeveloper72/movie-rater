import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toggleMobileNav(): void {
    const x = document.getElementById('mobileNav');
    if (x.className === 'navbar-collapse') {
      x.className += ' show';
    } else {
      x.className = 'navbar-collapse';
    }
  }
}
