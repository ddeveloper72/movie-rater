import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

const routes: Routes = [];  // declare a name for the array of routes



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
