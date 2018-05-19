import { AngularFireAuth } from "angularfire2/auth";
import { Job } from "./../../models/job.model";
import { AngularFireDatabase } from "angularfire2/database";
import { Hire } from "./../../models/hire.model";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import * as firebase from "firebase";
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
  selector: "page-hire",
  templateUrl: "hire.html"
})
export class HirePage {
  public pet = "all";
  public loading = true;
  public postedJobs: any;
  public locations: Location[];
  public post = {
    title: "",
    salary: "",
    location: "Jalandhar",
    address: "",
    type: "Full Time",
    description: "",
    uid: ""
  };
  public uid= '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private ac: AlertController
  ) {
    if (af.auth.currentUser != null) {
      this.loading = true;
      this.setupPost();
      this.uid = af.auth.currentUser.uid;

      this.postedJobs = new Array();

      let rf = firebase.database().ref("locations");
      const self = this;
      rf.on("value", data => {
        var vals = data.val();
        var jk = Object.keys(vals).map(key => {
          var obj = vals[key];
          return obj;
        });
        console.log(jk);
        self.locations = jk;
        self.loading = false;
        this.loading = false;
      });

      let ref = firebase.database().ref("jobs");
      ref
        .orderByChild("uid")
        .equalTo(this.uid)
        .on("child_added", data => {
          var obj = {
            key: data.key,
            data: data.val()
          };
          self.postedJobs.push(obj);
          console.log(self.postedJobs);
          if (self.postedJobs.length == data.numChildren()) {
            self.loading = false;
            return;
          }
          self.loading = false;
          this.loading = false;
        },error => {
          self.loading = false;
        });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HirePage");
  }

  ionViewWillEnter(){
   if(this.af.auth.currentUser == null) {
     this.navCtrl.push(LoginPage)
   }
  }

  addPost() {
    this.loading = true;
    const self = this;
    var ref = firebase.database().ref('jobs');
      ref.push(this.post).then(res => {
        self.loading = false;
        self.showMessage("Success", "Job posted successfully !");
        self.setupPost();
      });
  }

  showMessage(title: String, msg: String) {
    let alertData = this.ac.create({
      title: "" + title,
      subTitle: "" + msg,
      buttons: ["OK"]
    });
    alertData.present();
  }

  deleteJob(key:String) {
    console.log(key);
    var ref = firebase.database().ref('jobs/'+key);
    ref.remove();
  }

  setupPost() {
    var uid = this.af.auth.currentUser.uid;
    this.post = {
      title: "",
      salary: "",
      location: "Jalandhar",
      address: "",
      type: "Full Time",
      description: "",
      uid: uid
    };
  }
}
