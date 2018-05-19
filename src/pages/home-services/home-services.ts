import { ServiceDetailsPage } from './../service-details/service-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-services',
  templateUrl: 'home-services.html',
})
export class HomeServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeServicesPage');
  }

  getService(val:String) {
    this.navCtrl.push(ServiceDetailsPage,{value:val});
  }

}
