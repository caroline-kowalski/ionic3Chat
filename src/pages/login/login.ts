import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private mode: string;
  private emailPasswordForm: FormGroup;
  private emailForm: FormGroup;
  // LoginPage
  // This is the page where the user can register and login to our app.
  // It's important to initialize the loginProvider here and setNavController as it will direct the routes of our app.
  constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public formBuilder: FormBuilder) {
    // It's important to hook the navController to our loginProvider.
    this.loginProvider.setNavController(this.navCtrl);
    // Create our forms and their validators based on validators set on validator.ts.
    this.emailPasswordForm = formBuilder.group({
      email: Validator.emailValidator,
      password: Validator.passwordValidator
    });
    this.emailForm = formBuilder.group({
      email: Validator.emailValidator
    });
  }

  ionViewDidLoad() {
    // Set view mode to main.
    this.mode = 'main';
  }

  // Call loginProvider and login the user with email and password.
  // You may be wondering where the login function for Facebook and Google are.
  // They are called directly from the html markup via loginProvider.facebookLogin() and loginProvider.googleLogin().
  login() {
    this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
  }

  // Call loginProvider and register the user with email and password.
  register() {
    this.loginProvider.register(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
  }

  // Call loginProvider and send a password reset email.
  forgotPassword() {
    this.loginProvider.sendPasswordReset(this.emailForm.value["email"]);
    this.clearForms();
  }

  // Clear the forms.
  clearForms() {
    this.emailPasswordForm.reset();
    this.emailForm.reset();
  }

}
