import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');  // got the token at ngOnInit stage & store as constant
    console.log('😎 Mr Token', mrToken);
  }

  saveForm(): void {
    console.log(this.authForm.value);
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {  // use the data type definition for what the token is
        this.cookieService.set('mr-token', result.token);  //  define the name of the token file and result of what it is to contain
      },
      error => console.log(error)
    );
  }
 }
