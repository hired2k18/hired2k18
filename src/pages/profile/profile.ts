import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from '@firebase/util';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profession = '';
  name = '';
  experience = '';
  email: String = '';
  phone = '';
  ref = null;
  loggedIn = false;
  uid = null;

  constructor(public navCtrl: NavController,private afa: AngularFireAuth,private ac:AlertController,private db:AngularFireDatabase) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  ionViewWillEnter(){
    const self = this;
    this.afa.authState.subscribe(user => {
      if(!(user && user.uid)) {
        self.loggedIn = false;
        self.login();
       
      } else {
        self.loggedIn = true;
        self.uid = user.uid;
        self.setupProfile();
      }
    }, err => {

    });
  }

  setupProfile() {
    const self = this;
    if(this.uid != null) {
      const uref = this.db.object('users/'+this.uid);
      uref.valueChanges().subscribe(res => {
        console.log(res);
        self.name = res['name'];
        self.profession = res['profession'];
        self.experience = res['experience'];
        self.email = res['email'];
        self.phone = res['phone'];
      });
    }
  }

  doLogout() {
    this.afa.auth.signOut();
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  showError(msg:String) {
    let alertData = this.ac.create({
      title: 'Invalid Data',
      subTitle: ''+msg,
      buttons: ['OK']
    });
    alertData.present();
  }

}
