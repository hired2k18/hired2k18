import { ServiceProfilePage } from './../service-profile/service-profile';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user.model';
import * as firebase from 'firebase';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-service-details',
  templateUrl: 'service-details.html',
})
export class ServiceDetailsPage {
  public users: any[];
  title ='';
  loading = true;
  constructor(public ac:AlertController,public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase,private auth:AngularFireAuth) {
    const self = this;
    this.users = new Array();

    let ref = firebase.database().ref('users');

    ref.orderByChild('profession').equalTo(this.navParams.get('value')).on('child_added', data => {
      var obj = {
        key: data.key,
        value: data.val()
      }
      self.users.push(obj);
      if(self.users.length == data.numChildren()) {
        self.loading = false;
        this.loading = false;
        return;
      }
      self.loading = false;
      this.loading = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailsPage'+this.navParams.get('value'));
    
  }

  ionViewWillEnter(){
    

  }

  bookService(key:String) {
    const self = this;
    this.loading = true;
    var date: Date = new Date();
    if(this.auth.auth.currentUser != null) {
      var book = {
        date: date.toString(),
        uid: this.auth.auth.currentUser.uid
      }
      var rf = firebase.database().ref('bookings/'+key);
      rf.push(book).then(data => {
        self.loading = false;
        self.showMessage('Success','Booking successfull');
      },err => {
        self.loading = false;
      });
    } else {
      this.loading = false;
      this.navCtrl.push(LoginPage);
    }
  }

  showProfile(key:String) {
    this.navCtrl.push(ServiceProfilePage,{key:key});
  }

  showMessage(title:String,msg:String) {
    let alertData = this.ac.create({
      title: ''+title,
      subTitle: ''+msg,
      buttons: ['OK']
    });
    alertData.present();
  }

}
