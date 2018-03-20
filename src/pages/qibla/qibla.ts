import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as $ from 'jquery'

/**
 * Generated class for the QiblaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qibla',
  templateUrl: 'qibla.html',
})
export class QiblaPage {
     
  constructor(public navCtrl: NavController, 
    
    public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QiblaPage');
    var url = 'https://qiblafinder.withgoogle.com/intl/en'
    this.openWebpage(url)
  }
  ngAfterViewInit(){
    console.log('hello')
  }
  openWebpage(url: string) {    
     $("#siteloader").html(`<object target="_self" data=${url} />`);
     $(".logo_wrapper").html('')
  }
  

}
