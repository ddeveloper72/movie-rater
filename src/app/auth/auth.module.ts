import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { ReactiveFormsModule } from '@angular/forms';

// declare a name for the array of routes
const routes: Routes = [
  { path: 'auth', component: AuthComponent }  //  auth uses the AuthComponent

];



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    // allow import of routes in the childModule
    RouterModule.forChild(routes),
    IconSpriteModule,
    ReactiveFormsModule,
    SharedModule
  ],
  // export routes to the app module
  providers: [],
  exports: [RouterModule]
})
export class AuthModule {}
