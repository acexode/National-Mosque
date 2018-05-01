import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the DuaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dua',
  templateUrl: 'dua.html',
  
})
export class DuaPage {
duas
title
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var all = navParams.data.item;
    this.duas = (all[0].duas)
    this.title = all[0].title
    console.log(this.duas)
  }

  ionViewDidLoad() {

     console.log('ionViewDidLoad DuaPage');
  }

  dec(str:any) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }

}
