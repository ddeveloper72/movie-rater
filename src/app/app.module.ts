import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';

const routes: Routes = [];  // declare a name for the array of routes

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    RouterModule.forRoot(routes)  // include imports for routes into the main module
  ],
  exports : [
    RouterModule  // include exports for routes from the main module
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
