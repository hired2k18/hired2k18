import { ServiceDetailsPage } from './../pages/service-details/service-details';
import { ServiceProfilePage } from './../pages/service-profile/service-profile';
import { Toast } from '@ionic-native/toast';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { HirePage } from '../pages/hire/hire';
import { HomeServicesPage } from '../pages/home-services/home-services';
import { JobsPage } from '../pages/jobs/jobs';
import { ProfilePage } from '../pages/profile/profile';
import { NearbyPage } from '../pages/nearby/nearby';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { JobsProvider } from '../providers/jobs/jobs';

const fireConfig = {
  apiKey: "AIzaSyB-RJRbr5o9gh-w5PH0LeiZG1L2jBT3IMo",
  authDomain: "hired-2k18-new.firebaseapp.com",
  databaseURL: "https://hired-2k18-new.firebaseio.com",
  projectId: "hired-2k18-new",
  storageBucket: "hired-2k18-new.appspot.com",
  messagingSenderId: "1036024330568"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    HirePage,
    HomeServicesPage,
    JobsPage,
    ProfilePage,
    NearbyPage,
    PortfolioPage,
    ServiceDetailsPage,
    ServiceProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    HirePage,
    HomeServicesPage,
    JobsPage,
    ProfilePage,
    NearbyPage,
    PortfolioPage,
    ServiceDetailsPage,
    ServiceProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    AngularFireDatabase,
    JobsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JobsProvider
  ]
})
export class AppModule {}
