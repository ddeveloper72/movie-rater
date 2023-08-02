import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Validation from '../helper/validation';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';
// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  currentUser: User;
  loading = false;
  returnUrl: string;
  registerMode: boolean;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  form: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    // confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    // use separate validation methods for registered and registering users
    if (!this.registerMode) {
      this.form = this.formBuilder.group(
        {
          username: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ],
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40),
            ],
          ],
        }
      );
    } else {
      // Register Mode
      this.form = this.formBuilder.group(
        {
          username: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ],
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        {
          validators: [Validation.match('password', 'confirmPassword')],
        }
      );
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(JSON.stringify(this.form.value, null, 2));

    // if form invalid, Stop
    if (this.form.invalid) {
      console.log(Response + '🛑 This from is invalid');
      return;
    }

    // if form is not login, go to loginUser()
    if (!this.registerMode) {
      this.loginUser();

      // register new user passing data to authenticationService then pass data to loginUser()
    } else {
      this.authenticationService.register(this.form.value).subscribe(
        (result) => {
          this.loginUser();
          // save the authentication token from the backend as currentUser in local storage
          console.log('Register form result:', result);
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.onReset();
        }
      );
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  loginUser(): void {
    this.submitted = true; // login user
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.form.value)
      .pipe(first())
      .subscribe(
        (result) => {
          // pass data to AuthenticationService service where it is saved in local storage as a value.
          // the AuthService then shares the user status with other app components.
          this.router.navigate(['/movies']);
        },
        (error) => {
          this.loading = false;
          this.onReset();
        }
      );
  }
}
