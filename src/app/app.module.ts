import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { MainModule } from './movies/main.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptor } from './helper/error.interceptor';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, FooterComponent],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), // include imports for routes into the main module
    IconSpriteModule,
    SharedModule
  ],
  exports: [
    IconSpriteModule,
    RouterModule // include exports for routes from the main module
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
