import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, RadioButton, RadioGroup } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import {FormGroup,FormControl} from '@angular/forms';
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
  Methods = [
    {method:'MWL',fajr:'18°',isha:'17°'},
    {method:'ISNA',fajr:'15°',isha:'15°'  },
    {method:'Egypt',fajr:'19.5°',isha:'17.5°' },
    {method:'Makkah',fajr:'18.5°',isha:'90 min' },
    {method:'Karachi',fajr:'18°',isha:'18°' },
    {method:'Tehran',fajr:'17.7°',isha:'14°' },
    {method:'Jafari',fajr:'16°',isha:'14°' }] 	
    jurists = ['Standard	(Shafii, Maliki, Jafari and Hanbali)','Hanafi'];
  Juristic;
  method = localStorage.getItem('calcmethod')
  juristFormControl= new FormControl(this.jurists[0])
  juristForm = new FormGroup({
    'juristFormControl': this.juristFormControl
  })
  CalcmethodFormControl = new FormControl(this.method)
  CalcmethodForm = new FormGroup({
    'CalcmethodFormControl': this.CalcmethodFormControl
  })
  constructor(public navCtrl: NavController, public navParams: NavParams,public settings:SettingsProvider) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsettingsPage');
    this.title = this.navParams.get('item')
 
  }
   addCity(){
    this.settings.showPrompt()
  }
  
  doSubmit(ev: UIEvent) {
    console.log('Submitting form', ev);
    localStorage.setItem('calcmethod',this.CalcmethodForm.value.CalcmethodFormControl)
    //ev.preventDefault();
  }

 
}
