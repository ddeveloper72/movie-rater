import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

interface TokenObject {
  token: string;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('',
    [Validators.required]
    ),
    password: new FormControl('',
    [Validators.required]
    )
  });

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  saveForm(): void {
    console.log(this.authForm.value);
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {
        console.log(result);
        this.cookieService.set('mr-token', result.token);
      },
      error => console.log(error)
    );
  }
}
