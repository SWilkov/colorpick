import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HexToDecimalComponent } from './pages/hex-to-decimal/hex-to-decimal.component';
import { HexToRgbaComponent } from './pages/hex-to-rgba/hex-to-rgba.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hex-to-decimal',
    pathMatch: 'full'
  },  
  {
    path: 'hex-to-rgba',
    component: HexToRgbaComponent
  },
  {
    path: 'hex-to-decimal',
    component: HexToDecimalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
