import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, private afa: AngularFireAuth,private ac:AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){
    this.afa.authState.subscribe(user => {
      if(user && user.uid) {
        this.navCtrl.popToRoot();
      }
    }, err => {
      console.log(err);
    });
  }

  doLogin() {
    if(this.user.email == '' || this.user.password == '') {
      this.showError('All field are required !');
    } else {
      this.afa.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
        .then( user => {
          //this.navCtrl.pop();
        })
        .catch( err => {
          this.showError('Error occurred !');
        });
    }
  }

  openRegister() {
    this.navCtrl.push(RegisterPage);
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
