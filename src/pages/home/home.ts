import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  Platform,Events } from 'ionic-angular';
import { AzanProvider } from '../../providers/azan/azan';
import { Geolocation } from '@ionic-native/geolocation';

import { File } from '@ionic-native/file';
// import {Transfer, TransferObject} from '@ionic-native/transfer';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { ConnectionProvider } from '../../providers/connection/connection';
import { HelperProvider } from '../../providers/helper/helper';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';

//import { PrayersPage } from '../prayers/prayers';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pictureoftheday  
  slideone = [
    {
      title: 'Prayer Times',icon: 'clock',bg: '#FFC300',page: 'PrayersPage'
    },
    {
      title: 'Quran', icon: 'book', bg: '#FF334C',page: 'QuranPage'
    },
    {
      title: 'Mosques',icon: 'moon',bg: '#3383FF',page: 'MosquePage'
    },
    {
      title: 'Calender',icon: 'calendar',bg: '#33FFF3',page: 'CalenderPage'
    },
    {
      title: 'Adhkar',icon: 'calendar', bg: '#8DFF33',page: 'AdkharPage'
    },
    {
      title: 'Compass',icon: 'compass',bg: '#FF33E9',page: 'QiblaPage'
    },
    {
      title: 'Quotes',icon: 'heart',bg: '#FF334C',page: 'QuotesPage'
    },
    {
      title: '99 Names',icon: 'at',bg: '#f89b33',page: 'AsmaPage'
    },   
  ]
  slidetwo = [
    {
      title: 'Tasbih',icon: 'hand',bg: '#42f4df',page: 'TasbihPage'
    },
    {
      title: 'Settings', icon: 'cog', bg: '#1d61f3',page: 'SettingsPage'
    },
    {
      title: 'Makkah Live',icon: 'videocam',  bg: '#f53d3d',page: 'VideosPage'
    },
    {
      title: 'Saved', icon: 'bookmark',bg: '#FFC300',page: 'BookmarkPage'
    },
    {
      title: 'Popular', icon: 'star', bg: '#663399', page: 'PopularPage'
    },
  ]
   ROOT_DIRECTORY = 'file:///sdcard//';
     downloadFolderName = 'tempDownloadFolder'; 
  storageDirectory: string = '';
  prayers
  date
  country
  locality
  title
  htoMins // convert to minutes
  pNames // prayer names
  toMinutes = []
  nextPrayerTitle 
  nextPrayerTime   
 
  constructor(     
    public navParams: NavParams, public navCtrl: NavController, public azan: AzanProvider, public geo: Geolocation,
    public platform: Platform, public connect: ConnectionProvider,  public geoCode: NativeGeocoder,  
    public helper: HelperProvider, public events: Events, public viewer: PhotoViewer, public file: File,
    public socialShare: SocialSharing,           
  ) {

  }
  
  ionViewDidEnter() {
    this.events.subscribe('latlng',(lat,lng)=>{
       
      this.prayerTime(lat,lng)    
    })
  }

  ionViewDidLoad() {
    this.dailyQuotes()    
    if(this.platform.is('cordova')){
      this.events.subscribe('latlng',(lat,lng)=>{
       
        this.prayerTime(lat,lng)    
      })
      this.events.subscribe('locality',(country,locality)=>{
       
        this.country = country
        this.locality = locality + ','   
      })
     
    } else{
      // for browser
       this.geo.getCurrentPosition().then((pos)=>{      
         this.prayerTime(pos.coords.latitude,pos.coords.longitude)   
       }) 
       
    }
    
    console.log('ionViewDidLoad HomePage');
   
 }

  dailyQuotes(){
    var rand = Math.floor((Math.random() * 18) + 1)
    this.pictureoftheday = `assets/gallery/${rand}.jpeg` 
  }

 
  goto(page){
    this.navCtrl.push(page)
  }
 
/**
 * Takes two parameters.
 *
 * lat and lng
 * 
 */
  prayerTime(lat,lng){       
     var Minutes = this.helper.currTime()  
     
     var method = localStorage.getItem('calcmethod')
     this.prayers = this.azan.getPrayers([lat,lng],method)
       
       this.pNames = Object.keys(this.prayers).splice(1, 4).concat(Object.keys(this.prayers).splice(6, 2))
         
        var vals =  (<any>Object).values(this.prayers).splice(1, 4).concat( (<any>Object).values(this.prayers).splice(6, 2))
        this.toMinutes= [].concat.apply([],this.helper.splitTime(vals))
        this.helper.forAlert(vals)        
        var temp = []
        this.pNames.map((name,index,arr)=>{
          if(Minutes < this.toMinutes[index]){
            temp.push(this.toMinutes[index])
            if(temp[0] == this.toMinutes[index]){                        
              this.nextPrayerTitle=  name
              this.nextPrayerTime=  this.prayers[name]
            }
           
          }else if(Minutes > this.toMinutes[this.toMinutes.length-1]){
            temp.push(this.toMinutes[index])
            if(temp[0] == this.toMinutes[index]){              
              this.nextPrayerTitle=  name
              this.nextPrayerTime=  this.prayers[name]
             }
          }
          
        })
   } 
  
  share(url) {        
    var imageName = this.path(url)
    this.save(url).then(entries =>{
        this.socialShare.share('National Mosque','Quote of the day', this.ROOT_DIRECTORY + this.downloadFolderName + "/" + imageName, imageName)
              .then((entries) => {
                console.log('success ' + JSON.stringify(entries));
              })
              .catch((error) => {
                console.log('error ' + JSON.stringify(error));
              });
      })
  }
  view(pic){
    var imageName = this.path(pic)
     this.save(imageName).then(entries =>{
      this.viewer.show(this.ROOT_DIRECTORY + this.downloadFolderName + "/" + imageName, imageName)
      
    }).catch((error) => {
      alert('error ' + JSON.stringify(error));
    });
    
  }
  path(pic){
    let imagePath = pic;
    var n = imagePath.lastIndexOf("/");
    var imageName = imagePath.substr(n+1);
    return imageName
  }
  save(imageName){   
    return this.file.createDir(this.ROOT_DIRECTORY, this.downloadFolderName, true)
    .then((entries) => {
      return this.file.copyFile(this.file.applicationDirectory + "www/assets/gallery/", imageName, this.ROOT_DIRECTORY + this.downloadFolderName + '//', imageName)
       }).catch((error) => {
      console.log('error ' + JSON.stringify(error));
    });
  }
 
}
