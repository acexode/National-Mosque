import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { QuranProvider } from '../../providers/quran/quran';
import { NativeStorage } from '@ionic-native/native-storage';
declare var html2canvas
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
  ar
  en
  info
  bookmarked = []
  bg = ''
  clicked = false
  show = true
  bgColors = [    
       '#16a085',
      '#3498db',
      '#9b59b6',
       '#f1c40f',
       '#d35400',
       '#2c3e50',
     '#1abc9c',
      '#273c75',
      '#487eb0',
       
      
  ]
  screenshot
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
  
  share(name,ar,en,ayah,index){
    console.log(ar)
    this.clicked = true
    this.bg = 'assets/sharebg/'+Math.floor(Math.random()*20 )+'.jpg'
    document.getElementById('cap').style.backgroundImage = ` linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${this.bg})`
    document.getElementById('cap').style.backgroundSize = `cover`
    
    //var id = 'share'+index
    this.show = false
    this.ar = ar
    this.en = en
    this.info = name +' '+ ayah  
    
    html2canvas(document.getElementById('cap'), {
      onrendered: function(canvas) {
        var screenshot = canvas.toDataURL("image/png");
        console.log(screenshot)
        document.getElementById("textScreenshot").setAttribute("src", screenshot);
        this.show = true
      }
    });
    
  }
}
