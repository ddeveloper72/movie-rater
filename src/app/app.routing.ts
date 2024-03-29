import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './helper/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './movies/main.component';


const appRoutes: Routes = [
  // { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'auth' , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'movies',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
