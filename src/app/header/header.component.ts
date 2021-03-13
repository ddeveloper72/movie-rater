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
    this.router.navigate(['/welcome']);
  }

  toggleMobileNav(): void {
    const mainNav = document.getElementById('mobile-menu');
    if (mainNav.className === 'navbar__nav') {
      mainNav.className = 'navbar__mobile';
    } else {
      mainNav.className = 'navbar__nav';
    }
  }
}
