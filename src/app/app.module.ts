import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptor } from './helper/error.interceptor';
import { SharedModule } from './shared/shared.module';


// declare a name for the array of routes
const routes: Routes = [
  { path: 'movies', component: AppComponent } // if path does not match, redirect to here.
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    appRoutingModule,
    RouterModule.forRoot(routes), // include imports for routes into the main module
    IconSpriteModule,
    SharedModule
  ],
  exports: [
    RouterModule // include exports for routes from the main module
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
