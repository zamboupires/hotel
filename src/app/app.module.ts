import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelModule } from './hotels/hotel.module';

registerLocaleData(localFr, 'fr')

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home' , component: HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},

      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]),
    HotelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
