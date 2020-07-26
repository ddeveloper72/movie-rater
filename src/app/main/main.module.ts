import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ApiService } from '../api.service';
addedimport { IconSpriteModule } from 'ng-svg-icon-sprite';

import { MainComponent } from './main.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

// declare a name for the array of routes
const routes: Routes = [
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
    IconSpriteModule
  ],
  // export routes to the app module
  exports: [RouterModule],
  providers: [ApiService]
})
export class MainModule {}
