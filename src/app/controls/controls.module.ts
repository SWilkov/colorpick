import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MinimalInputComponent } from './minimal-input/minimal-input.component';
import { BalloonComponent } from './balloon/balloon.component';
import { FormsModule } from '@angular/forms';
import { ClearButtonComponent } from './clear-button/clear-button.component';
import { HexToRgbaComponent } from '../pages/hex-to-rgba/hex-to-rgba.component';
import { AppLinkService } from '../services/app-link.service';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    MinimalInputComponent,
    BalloonComponent,
    ClearButtonComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    MinimalInputComponent,
    BalloonComponent,
    ClearButtonComponent,
    
  ],
  providers: [
     
  ]
})
export class ControlsModule { }
