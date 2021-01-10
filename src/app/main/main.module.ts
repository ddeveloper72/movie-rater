import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApiService } from '../services/api.service';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { HomeComponent } from '../home/home.component';
import { SharedModule } from '../shared/shared.module';


// declare a name for the array of routes
const routes: Routes = [
  { path: '', component: HomeComponent }, // if path does not match, redirect to here.
  { path: 'movies', component: MainComponent } //  movies uses the MainComponent
];



@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieFormComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    // added imports for routes
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    IconSpriteModule,
    SharedModule
  ],
  // export routes to the app module
  exports: [RouterModule],
  providers: [ApiService]
})
export class MainModule {}
