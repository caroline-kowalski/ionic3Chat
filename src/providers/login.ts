import { Injectable, NgZone } from '@angular/core';
import { Facebook } from 'ng2-cordova-oauth/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import * as firebase from 'firebase';
import { Login } from '../login';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from './loading';
import { AlertProvider } from './alert';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class LoginProvider {

  private oauth: OauthCordova;
  private navCtrl: NavController;
  private facebookProvider = new Facebook({
    clientId: Login.facebookAppId,
    appScope: ["email"]
  });

  constructor(public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public zone: NgZone, public googleplus: GooglePlus) {
    console.log("Initializing Login Provider");
    this.oauth = new OauthCordova();
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user["isAnonymous"]) {
          //Goto Trial Page.
          // this.navCtrl.setRoot(Login.trialPage, { animate: false });
        } else {
          if (Login.emailVerification) {
            if (user["emailVerified"]) {
              //Goto Home Page.
              this.zone.run(() => {
                this.navCtrl.setRoot(Login.homePage, { animate: false });
              });
              //Since we're using a TabsPage an NgZone is required.
            } else {
              //Goto Verification Page.
              this.navCtrl.setRoot(Login.verificationPage, { animate: false });
            }
          } else {
            //Goto Home Page.
            this.zone.run(() => {
              this.navCtrl.setRoot(Login.homePage, { animate: false });
            });
            //Since we're using a TabsPage an NgZone is required.
          }
        }
      }
    });
  }

  // Hook this provider up with the navigationController.
  // This is important, so the provider can redirect the app to the views depending
  // on the status of the Firebase user.
  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  // Facebook Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
  // redirects the user to its respective views. Make sure to set your FacebookAppId on login.ts
  // and enabled Facebook Login on Firebase app authentication console.
  facebookLogin() {
    this.oauth.logInVia(this.facebookProvider).then(success => {
      let credential = firebase.auth.FacebookAuthProvider.credential(success['access_token']);
      this.loadingProvider.show();
      firebase.auth().signInWithCredential(credential)
        .then((success) => {
          this.loadingProvider.hide();
        })
        .catch((error) => {
          this.loadingProvider.hide();
          let code = error["code"];
          this.alertProvider.showErrorMessage(code);
        });
    }, error => { });
  }

  // Google Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
  // redirects the user to its respective views. Make sure to set your GoogleWebClient Id on login.ts
  // and enabled Google Login on Firebase app authentication console.
  googleLogin() {
    this.loadingProvider.show();
    this.googleplus.login({
      'webClientId': Login.googleClientId
    }).then((success) => {
      let credential = firebase.auth.GoogleAuthProvider.credential(success['idToken'], null);
      firebase.auth().signInWithCredential(credential)
        .then((success) => {
          this.loadingProvider.hide();
        })
        .catch((error) => {
          this.loadingProvider.hide();
          let code = error["code"];
          this.alertProvider.showErrorMessage(code);
        });
    }, error => { this.loadingProvider.hide(); });
  }


  // Login on Firebase given the email and password.
  emailLogin(email, password) {
    this.loadingProvider.show();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Register user on Firebase given the email and password.
  register(email, password) {
    this.loadingProvider.show();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Send Password Reset Email to the user.
  sendPasswordReset(email) {
    this.loadingProvider.show();
    firebase.auth().sendPasswordResetEmail(email)
      .then((success) => {
        this.loadingProvider.hide();
        this.alertProvider.showPasswordResetMessage(email);
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

}
