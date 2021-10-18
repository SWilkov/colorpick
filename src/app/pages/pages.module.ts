import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HexToRgbaComponent } from './hex-to-rgba/hex-to-rgba.component';
import { ControlsModule } from '../controls/controls.module';



@NgModule({
  declarations: [
    HexToRgbaComponent
  ],
  imports: [
    CommonModule,
    ControlsModule
  ],
  exports: [
    HexToRgbaComponent
  ]
})
export class PagesModule { }
