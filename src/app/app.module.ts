import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';

// declare a name for the array of routes
const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'movies' }  // if path does not match, redirect to here.
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    IconSpriteModule,
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
