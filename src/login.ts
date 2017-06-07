import { TabsPage } from './pages/tabs/tabs';
import { VerificationPage } from './pages/verification/verification';

export namespace Login {
  // replace with your key
  export const firebaseConfig = {
    apiKey: "AIzaSyBCvQGbfQWbnhuKIgpCJvi99stwV7wRa5E",
    authDomain: "tolk-743bf.firebaseapp.com",
    databaseURL: "https://tolk-743bf.firebaseio.com",
    projectId: "tolk-743bf",
    storageBucket: "tolk-743bf.appspot.com",
    messagingSenderId: "953415908656"
  };
  export const facebookAppId: string = "1513931125304392";
  export const googleClientId: string = "1033449149481-ji4ldp5r1l2mjc8jh7kr2n3cl9vb4coc.apps.googleusercontent.com";
  export const homePage = TabsPage;
  export const verificationPage = VerificationPage;
  export const emailVerification: boolean = true;
}

