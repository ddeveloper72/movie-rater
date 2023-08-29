import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    // allow import of routes in the childModule
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    IconSpriteModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  // export routes to the app module
  providers: [],
  exports: [RouterModule],
})
export class AuthModule {}
