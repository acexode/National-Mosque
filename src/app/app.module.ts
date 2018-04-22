import { NgModule, ErrorHandler, } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../pages/tabs/tabs';
import { Badge } from '@ionic-native/badge';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectionProvider } from '../providers/connection/connection';

import { AzanProvider } from '../providers/azan/azan';

import { File } from '@ionic-native/file';
import { QuranProvider } from '../providers/quran/quran';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { NativeStorage } from '@ionic-native/native-storage';
import { HelperProvider } from '../providers/helper/helper';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Screenshot } from '@ionic-native/screenshot';
import { SettingsProvider } from '../providers/settings/settings';
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
    Geolocation,
    Network,
    AzanProvider,
    QuranProvider,
    NativeGeocoder,
    HttpClient,      
    Diagnostic,
    HelperProvider,
    SocialSharing,    
    File,FileOpener,
    DeviceOrientation,
    NativeStorage ,
    PhotoViewer,
    Screenshot,
    SettingsProvider,
    Badge
  ]
})
export class AppModule {}
