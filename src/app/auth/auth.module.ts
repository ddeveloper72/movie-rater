import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

// declare a name for the array of routes
const routes: Routes = [
  { path: 'auth', component: AuthComponent }  //  auth uses the AuthComponent

];



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    // allow import of routes in the childModule
    RouterModule.forChild(routes)
  ],
  // export routes to the app module
  exports: [RouterModule]
})
export class AuthModule {}
