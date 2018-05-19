import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeServicesPage } from '../home-services/home-services';
import { JobsPage } from '../jobs/jobs';
import { HirePage } from '../hire/hire';
import { NearbyPage } from '../nearby/nearby';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openHomeServices() {
    this.navCtrl.push(HomeServicesPage);
  }

  openJobs() {
    this.navCtrl.push(JobsPage);
  }

  openHire() {
    this.navCtrl.push(HirePage);
  }

  openNearby() {
    this.navCtrl.push(NearbyPage);
  }

}
