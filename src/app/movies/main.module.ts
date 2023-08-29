import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';

// declare a name for the array of routes


@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieFormComponent,
    MovieDetailsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    // added imports for routes
    ReactiveFormsModule,
    IconSpriteModule,
    SharedModule,
    MainRoutingModule
  ],
  providers: [ApiService],
})
export class MainModule {}
