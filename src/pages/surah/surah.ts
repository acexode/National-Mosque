import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { QuranProvider } from '../../providers/quran/quran';


/**
 * Generated class for the SurahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-surah',
  templateUrl: 'surah.html',
})
export class SurahPage {
  number 
  ayahs:any  
  englishName
  name
  text
  constructor(
    public navCtrl: NavController,
    public quran: QuranProvider,
    public loadCtrl:LoadingController,
    public navParams: NavParams) {
  }
  //Sample data
  // data": {
  //   "number": 114,
  //   "name": "سورة الناس",
  //   "englishName": "An-Naas",
  //   "englishNameTranslation": "Mankind",
  //   "revelationType": "Meccan",
  //   "numberOfAyahs": 6,
  //   "ayahs": [
  //   {
  //   "number": 6231,
  //   "audio": "http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/6231",
  //   "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
  //   "numberInSurah": 1,
  //   "juz": 30,
  //   "manzil": 7,
  //   "page": 604,
  //   "ruku": 556,
  //   "hizbQuarter": 240,
  //   "sajda": false
  //   },
  ionViewDidLoad() {
    console.log('ionViewDidLoad SurahPage');
    this.getSurah()
    this.getSurahEn()
    
    console.log( this.text)
   // console.log( this.ayahs)
    
  }
  getSurah(){
    this.number= this.navParams.get('number')
    console.log('this is '+ this.number)
    var surah = this.quran.getSurah(this.number)
    console.log(surah)
    this.name = surah.name  
    this.englishName = surah.englishName
    console.log(surah.ayahs)
    this.ayahs = (surah.ayahs)
    
  }
  getSurahEn(){
    //let loading = this.loadCtrl.create({content : "Loading in ,please wait..."});
   // loading.present();
    this.number= this.navParams.get('number')
    console.log('this is '+ this.number)    
    this.text = this.quran.getSurahEn(this.number).ayahs    
     console.log(this.text)
  
  }
  

}
