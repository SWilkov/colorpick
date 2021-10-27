import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HexToBinaryComponent } from './pages/hex-to-binary/hex-to-binary.component';
import { HexToDecimalComponent } from './pages/hex-to-decimal/hex-to-decimal.component';
import { HexToRgbaComponent } from './pages/hex-to-rgba/hex-to-rgba.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hex-to-binary', 
    pathMatch: 'full'
  },  
  {
    path: 'hex-to-rgba',
    component: HexToRgbaComponent
  },
  {
    path: 'hex-to-decimal',
    component: HexToDecimalComponent
  },
  {
    path: 'hex-to-binary',
    component: HexToBinaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
