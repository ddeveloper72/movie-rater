import { Routes, RouterModule  } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './helper/auth.guard';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'new', component: MovieFormComponent },
  { path: 'edit/:id', component: MovieFormComponent },

  // otherwise redirect to home
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
