import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HexToRgbaComponent } from './pages/hex-to-rgba/hex-to-rgba.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hex-to-rgba',
    pathMatch: 'full'
  },
  {
    path: 'hex-to-rgba',
    component: HexToRgbaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
