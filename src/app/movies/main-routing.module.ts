import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieFormComponent } from "./movie-form/movie-form.component";
import { MovieListComponent } from "./movie-list/movie-list.component";

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'new', component: MovieFormComponent },
  { path: 'edit/:id', component: MovieFormComponent },

  // otherwise redirect to home
  // { path: '', redirectTo: '/movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
