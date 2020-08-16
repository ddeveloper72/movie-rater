import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor() {}

  // retrieve validToken passed from app component
  @Input() validToken: any;
  // pass logoutUser to app component
  @Output() logoutUser = new EventEmitter();

  ngOnInit(): void {}

  // if token valid, pass to markup register link
  isAuthenticated(): void {
    const mrToken = this.validToken();
    if (mrToken) {
      this.validToken = true;
    }
  }

  // if click event, pass to app component
  onLogout(): void {
    this.logoutUser.emit();
  }
}
