import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';
// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit,  OnDestroy {
  currentUser: User;
  isLoading = false;
  isLoginMode = true;

  authForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  submitted = false;

  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  onSubmit(): void {
    // if form invalid, Stop
    if (!this.authForm.valid) {
      alert('Information on this Form is invalid');
      return;
    }


    this.submitted = true;

    // if form is not login, go to loginUser()
    if (this.isLoginMode) {
      this.loginUser();

      // register new user passing data to authenticationService
    } else {
      this.authenticationService
        .register(this.authForm.getRawValue())
        .subscribe(
          (result) => {
            console.log('Registration successful:', result);
            // Show success message and prompt user to login
            alert('Registration successful! Please log in with your credentials.');
            this.isLoginMode = true; // Switch to login mode
            // Don't auto-login, let user manually login
          },
          (error) => {
            console.error('Registration failed:', error);
            let errorMessage = 'Registration failed. Please try again.';
            
            // Better error handling
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.message) {
              errorMessage = error.message;
            }
            
            alert(errorMessage);
            this.authForm.reset();
          }
        );
    }
  }

  // reset form
  onReset(): void {
    this.submitted = false;
    this.authForm.reset();
  }

  // login user
  loginUser(): void {
    this.submitted = true;
    this.isLoading = true;
    this.authenticationService
      .login(this.authForm.getRawValue())
      .pipe(first())
      .subscribe(
        (result) => {
          // pass data to AuthenticationService service where it is saved in local storage as a value.
          // the AuthService then shares the user status with other app components.
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.error('Login failed:', error);
          let errorMessage = 'Username or password is incorrect';
          
          // Better error handling for server errors
          if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to server. Please check your internet connection.';
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          
          alert(errorMessage);
          this.isLoading = false;
          this.authForm.reset();
        }
      );
  }

  // reset form
  ngOnDestroy(): void {
    this.authForm.reset();
  }
}
