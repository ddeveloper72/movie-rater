import { Routes, RouterModule  } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { MainComponent } from './movies/main.component';
import { AuthGuard } from './helper/auth.guard';

const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'movies',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
