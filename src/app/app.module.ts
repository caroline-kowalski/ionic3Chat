import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { VerificationPage } from '../pages/verification/verification';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagesPage } from '../pages/messages/messages';
import { GroupsPage } from '../pages/groups/groups';
import { FriendsPage } from '../pages/friends/friends';
import { SearchPeoplePage } from '../pages/search-people/search-people';
import { RequestsPage } from '../pages/requests/requests';
import { UserInfoPage } from '../pages/user-info/user-info';
import { NewMessagePage } from '../pages/new-message/new-message';
import { MessagePage } from '../pages/message/message';
import { NewGroupPage } from '../pages/new-group/new-group';
import { GroupPage } from '../pages/group/group';
import { GroupInfoPage } from '../pages/group-info/group-info';
import { AddMembersPage } from '../pages/add-members/add-members';
import { ImageModalPage } from '../pages/image-modal/image-modal';

import { LoginProvider } from '../providers/login';
import { LogoutProvider } from '../providers/logout';
import { LoadingProvider } from '../providers/loading';
import { AlertProvider } from '../providers/alert';
import { ImageProvider } from '../providers/image';
import { DataProvider } from '../providers/data';
import { FirebaseProvider } from '../providers/firebase';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Login } from '../login';

import { FriendPipe } from '../pipes/friend';
import { SearchPipe } from '../pipes/search';
import { ConversationPipe } from '../pipes/conversation';
import { DateFormatPipe } from '../pipes/date';
import { GroupPipe } from '../pipes/group';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { Contacts } from '@ionic-native/contacts';
import { MediaCapture } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';

import { BrowserModule } from '@angular/platform-browser';

firebase.initializeApp(Login.firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    VerificationPage,
    TabsPage,
    MessagesPage,
    GroupsPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    NewGroupPage,
    GroupPage,
    GroupInfoPage,
    AddMembersPage,
    ImageModalPage,
    FriendPipe,
    ConversationPipe,
    SearchPipe,
    DateFormatPipe,
    GroupPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement:'top',
      mode: 'ios',
      scrollAssist: false,
      autoFocusAssist: false
    }),
    BrowserModule,
    AngularFireModule.initializeApp(Login.firebaseConfig,'ionic3chat'),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    VerificationPage,
    TabsPage,
    MessagesPage,
    GroupsPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    NewGroupPage,
    GroupPage,
    GroupInfoPage,
    AddMembersPage,
    ImageModalPage,
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    SplashScreen,
    StatusBar,
    GooglePlus,
    Camera,
    Keyboard,
    Contacts,
    MediaCapture,
    File,
    Geolocation,
    Firebase,
    LoginProvider,
    LogoutProvider,
    LoadingProvider,
    AlertProvider,
    ImageProvider,
    DataProvider,
    FirebaseProvider]
})
export class AppModule { }
