import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

/**
 * Generated class for the SubsettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subsettings',
  templateUrl: 'subsettings.html',
})
export class SubsettingsPage {
  title
  gps = 'GPS Location'
  calc = 'Calculation Method'
  juris = 'Juristic Method'
  constructor(public navCtrl: NavController, public navParams: NavParams,public settings:SettingsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsettingsPage');
    this.title = this.navParams.get('item')
 
  }
  addCity(){
    this.settings.showPrompt()
  }
}
