import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
import { Location } from '../../models/location.model';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  ref: any;
  locRef$: AngularFireList<any>;
  professions: String[] = ['Student','Electrician','Carpenter','Plumber','PC/Laptop Service','Pest Control','Complete House Cleaning','Baby Proofing','Furnishing','Tank Cleaner','Car/Bike Service','Laundry','House Painter','Interior Designer','Vasthu Sastra','Architect','Construction & Renovation','Modular Kitchen','CCTV','Movers & Packers'];
  locations: Location[];
  profession: String;
  user = {
    name: '',
    email: '',
    location: 'Jalandhar',
    address: '',
    profession: 'Student',
    phone: '',
    password: '',
    confirm_password: '',
    experience: ''
  }
  i: Number = 0;
  exp = false;

  constructor(public navCtrl: NavController,private ac:AlertController, private db: AngularFireDatabase, private afa: AngularFireAuth) {
    this.ref = db.list('users');
    
    this.locRef$ = db.list<Location>('locations');

    this.locations = new Array();

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
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  changeExp(value:any) {
    console.log(this.user.profession);
    if(this.user.profession != 'Student') {
      this.exp = true;
    } else {
      this.exp = false;
    }
  }

  doRegister() {
    if(this.user.name == '' || this.user.address == '' || this.user.phone == '' || this.user.email == '' ||this.user.password == '' ) {
      this.showError('One or more fields are not valid, try again');
    } else {
      if(this.user.password == this.user.confirm_password && this.user.password.length >= 6) {
        const User = {
          name: this.user.name,
          phone: this.user.phone,
          email: this.user.email,
          image: 'none',
          profession: this.user.profession,
          location: this.user.location,
          address: this.user.address,
          experience: this.user.experience,
        };
  
        this.afa.auth.createUserWithEmailAndPassword(this.user.email,this.user.password)
          .then( user => {
            let rf = this.db.object('users/'+user.user.uid);
            rf.set(User).then(data => {
              this.navCtrl.popToRoot();
            });
          })
          .catch( error => {
            this.showError('Error occurred !');
          });
      } else {
        this.showError('Passwords doesnot match !');
      }
    }
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
