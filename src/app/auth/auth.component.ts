import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../helper/must-match.validator';

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
  authForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  registerMode = false;

  constructor(
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    // redirect to movies if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/auth']);
    } else {
      this.router.navigate(['/movies']);
    }
  }


  ngOnInit(): void {

    this.authForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.authForm.controls;
  }

  saveForm(): void {
    this.submitted = true;

    // if form invalid, Stop
    if (this.authForm.invalid) {
      return;
    }

    // if form is not login, go to loginUser()
    if (!this.registerMode) {
      this.loginUser();

      // register new user passing data to authenticationService then pass data to loginUser()
    } else {
      this.authenticationService.register(this.authForm.value).subscribe(
        result => {
          this.loginUser();
          // save the authentication token from the backend as a TokenObject in local storage
          console.log('Register form result:', result);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }



  loginUser(): void {
    // if form invalid, Stop
    if (this.authForm.invalid) {
      return;

      // login user
    } else {
      this.loading = true;
      this.authenticationService
        .login(this.authForm.value)
        .pipe(first())
        .subscribe(
          result => {
            // pass data to AuthenticationService service where it is saved in local storage as a value.
            // the AuthService then shares the user status with other app components.

            this.router.navigate(['/movies']);
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        );
    }
  }
}
