import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

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
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  saveForm(): void {
    console.log(this.authForm.value);
    this.apiService.loginUser(this.authForm.value).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }
}
