import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { QuranProvider } from '../../providers/quran/quran';
import { NativeStorage } from '@ionic-native/native-storage';

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
  bookmarked = []
  constructor(
    public navCtrl: NavController,
    public quran: QuranProvider,
    public loadCtrl:LoadingController,
    public navParams: NavParams,
    public NativeStore: NativeStorage) 
     {
  }
  
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
  bookmark(name,ar,en,surahIndex){
         
      this.bookmarked.push({surah:name,ar:ar,en:en,index:surahIndex})
      this.NativeStore.setItem('bookmark'+name, JSON.stringify(this.bookmarked))
       
   
  }
  

}
