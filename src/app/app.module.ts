import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HexService } from './services/hex.service';
import { HexEffects } from './effects/hex.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { metaReducers, reducers } from './reducers';
import { ControlsModule } from './controls/controls.module';
import { FormsModule } from '@angular/forms';
import { ImageEffects } from './effects/image.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageService } from './services/image.service';
import { AppLinkService } from './services/app-link.service';
import { AppLinkEffects } from './effects/app-link.effects';
import { HexToRgbaComponent } from './pages/hex-to-rgba/hex-to-rgba.component';
import { ThemeService } from './services/theme.service';
import { ThemeEffects } from './effects/theme.effects';

@NgModule({
  declarations: [
    AppComponent,
    HexToRgbaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    
    ControlsModule,    
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    EffectsModule.forRoot([
      HexEffects,
      ImageEffects,
      AppLinkEffects,
      ThemeEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    
  ],
  exports: [
    HexToRgbaComponent
  ],
  providers: [
    HexService,
    ImageService,
    AppLinkService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
