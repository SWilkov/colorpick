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
import { RgbaViewerComponent } from './rgba-viewer/rgba-viewer.component';
import { ToggleDarkModeComponent } from './toggle-dark-mode/toggle-dark-mode.component';
import { HamburgerButtonComponent } from './hamburger-button/hamburger-button.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { ToggleLightModeComponent } from './toggle-light-mode/toggle-light-mode.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    MinimalInputComponent,
    BalloonComponent,
    ClearButtonComponent,
    RgbaViewerComponent,
    ToggleDarkModeComponent,
    HamburgerButtonComponent,
    MobileMenuComponent,
    ToggleLightModeComponent,
    
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
    RgbaViewerComponent,
    ToggleDarkModeComponent,
    ToggleLightModeComponent,
    HamburgerButtonComponent,
    MobileMenuComponent
  ],
  providers: [
     
  ]
})
export class ControlsModule { }
