import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HirePage } from './hire';

@NgModule({
  declarations: [
    HirePage,
  ],
  imports: [
    IonicPageModule.forChild(HirePage),
  ],
})
export class HirePageModule {}
