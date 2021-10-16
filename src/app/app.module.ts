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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    ControlsModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers
    }),
    EffectsModule.forRoot([
      HexEffects,
      ImageEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    HexService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
