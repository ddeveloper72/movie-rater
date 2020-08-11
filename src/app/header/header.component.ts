import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @Output() logoutUser = new EventEmitter();

  ngOnInit(): void {}

  onLogout(): void {
    this.logoutUser.emit();
  }
}
