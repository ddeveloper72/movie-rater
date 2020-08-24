import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
