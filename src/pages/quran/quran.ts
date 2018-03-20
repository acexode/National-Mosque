import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuranProvider } from '../../providers/quran/quran';
//import quran from 'quran'
/**
 * Generated class for the QuranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quran',
  templateUrl: 'quran.html',
})
export class QuranPage {
  surahs 
  constructor(
    public navCtrl: NavController, 
    public quran: QuranProvider, 
    public navParams: NavParams) {
  }
  // "number": 1,
  // "name": "سورة الفاتحة",
  // "englishName": "Al-Faatiha",
  // "englishNameTranslation": "The Opening",
  // "numberOfAyahs": 7,
  // "revelationType": "Meccan
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuranPage');
    console.log(this.quran.go())
    
      this.surahs = this.quran.getSurahs()
      console.log(this.surahs)
   
  }

  gotoSurah(number){
    console.log(number)
    this.navCtrl.push('SurahPage',{
      number
    })
  }

}
