import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import dua from './adkhar.json'
/**
 * Generated class for the AdkharPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-adkhar',
  templateUrl: 'adkhar.html',
})

export class AdkharPage {
  duas
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdkharPage');
    this.duas = dua
  }
  goTo(id){
    var item = this.duas.filter(data =>{
      return data.id == id
    })
    this.navCtrl.push('DuaPage',{item})
  }

}
