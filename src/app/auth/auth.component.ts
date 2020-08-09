import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

// define the data type fo the token going to be used
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
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');  // get the token at ngOnInit stage & store as constant
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
    console.log('😎 Mr Token', mrToken);
  }

  saveForm(): void {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {  // use the data type definition for what the token is
        this.cookieService.set('mr-token', result.token);  //  define the name of the token file and result of what it is to contain
        this.router.navigate(['/movies']);
      },
      error => console.log(error)
    );
  }
 }
