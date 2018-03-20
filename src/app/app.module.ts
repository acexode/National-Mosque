import { NgModule, ErrorHandler, } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectionProvider } from '../providers/connection/connection';
import { GmapProvider } from '../providers/gmap/gmap';
import { AzanProvider } from '../providers/azan/azan';

import { QuranProvider } from '../providers/quran/quran';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,   
    TabsPage,
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    TabsPage,
    
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    ConnectionProvider,
    GmapProvider,
    Geolocation,
    Network,
    AzanProvider,
    QuranProvider,
    NativeGeocoder,
    HttpClient,
    InAppBrowser,
    ScreenOrientation,
    Diagnostic 
  ]
})
export class AppModule {}
