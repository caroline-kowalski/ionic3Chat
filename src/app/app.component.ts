import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data';
//Pages
import { LoginPage } from '../pages/login/login';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, dataProvider: DataProvider, statusBar: StatusBar, splashScreen: SplashScreen, public fc: Firebase, public angularfire: AngularFireDatabase) {
    platform.ready().then(() => {
      this.fc.getToken().then( token => {
        console.log(token);
        localStorage.setItem('pushToken',token);
        if(firebase.auth().currentUser!=null || firebase.auth().currentUser!=undefined ){
          // update token
          this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid).update({
            pushToken: token
          });
        }
      }).catch( err=> {
        console.log(err);
      });
      this.fc.onTokenRefresh().subscribe(token =>{
        console.log(token);
        localStorage.setItem('pushToken',token);
        if(firebase.auth().currentUser!=null || firebase.auth().currentUser!=undefined ){
          // update token
          this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid).update({
            pushToken: token
          });
        }
      });
      this.fc.hasPermission().then( data => {
        if(data.isEnabled != true){
          this.fc.grantPermission().then( data => {
            console.log(data);
          });
        }
      });
      this.fc.onNotificationOpen().subscribe( data => {
        console.log(data);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
