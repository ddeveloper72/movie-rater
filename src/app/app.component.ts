import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // send status of mrToken to header components
  @Output() validToken = new EventEmitter();


  constructor(
    private apiService: ApiService, // initialize service
    private cookieService: CookieService,
    private router: Router
  ) {}


  ngOnInit(): void {}

  // check if mrToken is present in the cookieService
  validCookie(): void {
    const mrToken = this.cookieService.get('mr-token'); // get the token at ngOnInit stage & store as constant
    if (mrToken) {
      this.validToken.emit();
      console.log('✔ Valid Token:', mrToken);
    }
  }

  // remove mrToken if logout event received
  logoutUser(): void {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/']);
  }
}
