import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceProfilePage } from './service-profile';

@NgModule({
  declarations: [
    ServiceProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceProfilePage),
  ],
})
export class ServiceProfilePageModule {}
