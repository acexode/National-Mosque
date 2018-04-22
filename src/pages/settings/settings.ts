import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,AlertController } from 'ionic-angular';
import { ConnectionProvider } from '../../providers/connection/connection';
import { Geolocation } from '@ionic-native/geolocation';
import { HelperProvider } from '../../providers/helper/helper';
import cities from 'cities.json';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
items= [
  {title: 'GPS Location', action:'Edit Location'},
  
 ]
calc= [
  {title: 'Calculation Method', action:'Default'},
  {title: 'Juristic Method', action:'Default'},
]
about= [
  {title: 'Introduction', action:''},
  {title: 'Follow us on Twitter', action:''},
  {title: 'Like us on Facebook', action:''},
  {title: 'Share this App', action:''},
]
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public connect: ConnectionProvider,
    public geo: Geolocation,
    public helper: HelperProvider,
    public geoCode: NativeGeocoder,
    public events: Events,    
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  itemSelected(item){
    this.navCtrl.push('SubsettingsPage',{
      item
    })
  }
}
