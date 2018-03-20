import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TasbihPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasbih',
  templateUrl: 'tasbih.html',
})
export class TasbihPage {
  count = 0
  zikr = [{
    ar: 'سُبْحَانَ الله',
    tr: 'Subhana llah',
    en: 'Glory be to Allah'
  },
  {
    ar: 'الْحَمِدُ للهِ',
    tr: 'Alhumdulillah',
    en: 'All Praise is due to Allah'
  },
  {
    ar: 'اللهَ اَكْبَر',
    tr: ' Allahu Akbar',
    en: 'Allah is Great'
  },  
  {
    ar: 'أَسْتَغْفِرُ الله',
    tr: 'Astaghfirullaah',
    en: 'Oh Allah forgive me'
  }

]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasbihPage');
  }
  clicker(){
    if(this.count < 33){
      this.count +=1
    }
  }
  reset(){
    this.count = 0
  }
}
