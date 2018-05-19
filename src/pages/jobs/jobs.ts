import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {
  items: any;
  loading = true;
  location = '';
  locations: Location[];
  constructor(public navCtrl: NavController, public navParams: NavParams,afDB: AngularFireDatabase) {
    //this.items = afDB.list<User>('locations').snapshotChanges();
    this.items = new Array();
    

    let rf = firebase.database().ref('locations');
    const self = this;
    rf.on('value', data => {
      var vals = data.val();
      var jk = Object.keys(vals).map((key) => {
        var obj = vals[key];
        return obj;
      });
      console.log(jk);
      self.locations = jk;
      self.loading = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobsPage');
    
  }

  getAll(){

  }

  getPartTime(){
    
  }

  changeLocation(val:String) {

  }

}
