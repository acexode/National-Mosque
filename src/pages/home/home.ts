import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AzanProvider } from '../../providers/azan/azan';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// import {Transfer, TransferObject} from '@ionic-native/transfer';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { ConnectionProvider } from '../../providers/connection/connection';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HelperProvider } from '../../providers/helper/helper';
import { SocialSharing } from '@ionic-native/social-sharing';
declare var cordova;
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
      title: 'Prayer Times',
      icon: 'clock',
      bg: '#FFC300',
      page: 'PrayersPage'
    },
    {
      title: 'Quran',
      icon: 'book',
      bg: '#FF334C',
      page: 'QuranPage'
    },
    {
      title: 'Mosques',
      icon: 'moon',
      bg: '#3383FF',
      page: 'MosquePage'
    },
    {
      title: 'Calender',
      icon: 'calendar',
      bg: '#33FFF3',
      page: 'CalenderPage'
    },
    {
      title: 'Adhkar',
      icon: 'calendar',
      bg: '#8DFF33',
      page: 'AdkharPage'
    },
    {
      title: 'Compass',
      icon: 'compass',
      bg: '#FF33E9',
      page: 'QiblaPage'
    },
    {
      title: 'Quotes',
      icon: 'heart',
      bg: '#FF334C',
      page: 'QuotesPage'
    },
    {
      title: '99 Names',
      icon: 'at',
      bg: '#f89b33',
      page: 'AsmaPage'
    },   
  ]
  slidetwo = [
    {
      title: 'Tasbih',
      icon: 'hand',
      bg: '#42f4df',
      page: 'TasbihPage'
    },
    {
      title: 'Settings',
      icon: 'cog',
      bg: '#1d61f3',
      page: 'SettingsPage'
    },
    {
      title: 'Makkah Live',
      icon: 'videocam',
      bg: '#f53d3d',
      page: 'VideosPage'
    },
    {
      title: 'Saved',
      icon: 'bookmark',
      bg: '#FFC300',
      page: 'BookmarkPage'
    },
  ]
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
  fileTransfer: FileTransferObject = this.ft.create();
  constructor(     
    public navParams: NavParams,
    public navCtrl: NavController,
    public azan: AzanProvider,
    public geo: Geolocation,
    public platform: Platform,
    public connect: ConnectionProvider,
    private localNotifications: LocalNotifications,
    public geoCode: NativeGeocoder,  
    public helper: HelperProvider,  
    public ft: FileTransfer,
    public file: File,
    public socialShare: SocialSharing,    
    public alertCtrl: AlertController   
  ) {
   // this.storageDirectory = cordova.file.dataDirectory;
  }
  
  ionViewDidLoad() {
  
    var rand = Math.floor((Math.random() * 18) + 1)
    //this.countryCity()
    //this.getLocation() 
    if(this.platform.is('cordova')){
      this.getLocation()
      this.countryCity()
    } else{
       this.geo.getCurrentPosition().then((pos)=>{      
         this.prayerTime(pos.coords.latitude,pos.coords.longitude)   
       }) 
       
    }
    this.pictureoftheday = `assets/gallery/${rand}.jpeg` 
    console.log('ionViewDidLoad HomePage');
    var d = new Date();
    d.setHours(19,47,0);
   
    
 }

 countryCity(){
  this.connect.location().then(val =>{
    if(val){
      this.geo.getCurrentPosition().then((pos)=>{        
        if(this.platform.is('cordova')){
        this.geoCode.reverseGeocode(pos.coords.latitude,pos.coords.longitude).then(res =>{               
         
          this.country = res[0].countryName
          this.locality = res[0].locality + ','      
        }).catch(err =>{
          alert(JSON.stringify(err))
        })
      }
    })

    }else{
      this.locality = localStorage.getItem('myItem')
    }
  })
  
 }
 goto(page){
   this.navCtrl.push(page)
 }
  getLocation(){   
    this.connect.location().then(val =>{          
      if(val == true){
        this.geo.getCurrentPosition().then((pos)=>{      
         this.prayerTime(pos.coords.latitude,pos.coords.longitude)   
       }) 
      }else{
        if(localStorage.getItem('city') !== null){ 
            var mycity = localStorage.getItem('city')         
            
            this.geoCode.forwardGeocode(mycity).then(res =>{                        
              this.prayerTime(res[0].latitude,res[0].longitude)             
            })
      }else{
       this.showPrompt()
     }
      }
    })      
  }

  prayerTime(lat,lng){       
     var Minutes = this.helper.currTime()  
     console.log(lat,lng)
        this.prayers = this.azan.getPrayers([lat,lng],'MWL')
       
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
  
  
  
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'City',
      message: "Input your current city",
      inputs: [
        {
          name: 'City',
          placeholder: 'City'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {           
            var mycity = this.helper.toTitleCase(data.City)
            console.log(mycity);
            localStorage.setItem('city', mycity)
            this.geoCode.forwardGeocode(mycity).then(res =>{                           
              this.prayerTime(res[0].latitude,res[0].longitude)
            })    
          }
        }
      ]
    });
    prompt.present();
  }  
 
  share(url) {   
    let imagePath = url;
    var n = imagePath.lastIndexOf("/");
    var imageName = imagePath.substr(n+1);
    const ROOT_DIRECTORY = 'file:///sdcard//';
    const downloadFolderName = 'tempDownloadFolder'; 
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
    .then((entries) => {
      this.file.copyFile(this.file.applicationDirectory + "www/assets/gallery/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
      .then(entries =>{
        this.socialShare.share('National Mosque','Quote of the day', ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
              .then((entries) => {
                console.log('success ' + JSON.stringify(entries));
              })
              .catch((error) => {
                alert('error ' + JSON.stringify(error));
              });
      }).catch((error) => {
        alert('error ' + JSON.stringify(error));
      });

    }).catch((error) => {
      alert('error ' + JSON.stringify(error));
    });
    // this.platform.ready().then(() => {
    //   var str = url;
    // var n = str.lastIndexOf("/");
    // var image = str.substr(n+1);
    // const fileTransfer: FileTransferObject = this.ft.create();
    // const imageLocation = `${cordova.file.applicationDirectory}www/assets/gallery/${image}`;
    // this.socialShare.share('National Mosque','Quote of the day','file://assets/gallery/1.jpeg',null)
    
    // fileTransfer.download(imageLocation, this.storageDirectory + image).then((entry) => {

    //     // const alertSuccess = this.alertCtrl.create({
    //     //   title: `Download Succeeded!`,
    //     //   subTitle: `${image} was successfully downloaded to: ${entry.toURL()}`,
    //     //   buttons: ['Ok']
    //     // });

    //     // alertSuccess.present();
    //     this.socialShare.share('National Mosque','Quote of the day',entry.toURL(),null)

    //   }, (error) => {
    //     console.log(error)
    //     const alertFailure = this.alertCtrl.create({
    //       title: `Download Failed!`,
    //       subTitle: `${image} was not successfully downloaded. Error code: ${error.code}`,
    //       buttons: ['Ok']
    //     });

    //     alertFailure.present();

    //   });

   // });

  }
 
}
