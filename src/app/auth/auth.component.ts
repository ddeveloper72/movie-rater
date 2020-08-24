import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    // redirect to movies if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/auth']);
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

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/auth';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.authForm.controls;
  }

  saveForm(): void {
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }
    if (!this.registerMode) {
      this.loginUser();
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


loginUser() {
  if (!this.authForm.invalid && !this.registerMode) {
    this.authenticationService.login(this.authForm.value).subscribe(
      (result: TokenObject) => {
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
