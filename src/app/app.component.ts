import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsProvider } from '../providers/settings/settings';
import { Badge } from '@ionic-native/badge';
//declare var PrayTimes
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,settings:SettingsProvider,private badge: Badge) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     if(platform.is('cordova')){
        settings.getLocation(); 
        settings.countryCity();
        badge.clear()
     }
      statusBar.backgroundColorByHexString('#a34c50');
      splashScreen.hide();
    });
  }
}
