import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import all from './asma.json'
/**
 * Generated class for the AsmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asma',
  templateUrl: 'asma.html',
})
export class AsmaPage {
  asma
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.asma = all
    console.log('ionViewDidLoad AsmaPage');
    console.log(this.asma)
  }

}
