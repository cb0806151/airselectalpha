import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CursorPadComponent } from './components/cursor-pad/cursor-pad.component';

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    ButtonComponent,
    HomeComponent,
    SettingsComponent,
    ShopComponent,
    CursorPadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
