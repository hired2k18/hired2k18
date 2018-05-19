import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-service-profile',
  templateUrl: 'service-profile.html',
})
export class ServiceProfilePage {
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var rf = firebase.database().ref('users/'+navParams.get('key'));
    const self = this;
    rf.on('value',data => {
      self.user = data.val();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceProfilePage');
  }

}
