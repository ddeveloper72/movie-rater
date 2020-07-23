import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [];  // declare a name for the array of routes



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
