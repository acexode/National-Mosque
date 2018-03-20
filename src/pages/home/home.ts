import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AzanProvider } from '../../providers/azan/azan';
import { Geolocation } from '@ionic-native/geolocation';

import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { ConnectionProvider } from '../../providers/connection/connection';

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
  ]
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
    public navParams: NavParams,
    public navCtrl: NavController,
    public azan: AzanProvider,
    public geo: Geolocation,
    public platform: Platform,
    public connect: ConnectionProvider,
    public geoCode: NativeGeocoder,    
    public alertCtrl: AlertController   
  ) {
  }
 
  ionViewDidLoad() {
    var rand = Math.floor((Math.random() * 18) + 1)
    this.countryCity()
    this.getLocation()  
    this.pictureoftheday = `assets/gallery/${rand}.jpeg` 
    console.log('ionViewDidLoad HomePage');
 }

 countryCity(){
  // this.connect.location().then(val =>{
  //   if(val){
  //     this.geo.getCurrentPosition().then((pos)=>{        
  //       if(this.platform.is('cordova')){
  //       this.geoCode.reverseGeocode(pos.coords.latitude,pos.coords.longitude).then(res =>{               
  //         alert(res[0].countryName)
  //         this.country = res[0].countryName
  //         this.locality = res[0].locality + ','      
  //       }).catch(err =>{
  //         alert(JSON.stringify(err))
  //       })
  //     }
  //   })

  //   }else{
  //     this.locality = localStorage.getItem('myItem')
  //   }
  // })
  
 }
 goto(page){
   this.navCtrl.push(page)
 }
  getLocation(){   
      this.geo.getCurrentPosition().then((pos)=>{      
          this.prayerTime(pos.coords.latitude,pos.coords.longitude)          
      }).catch(err =>{
       console.log(err)
       if(localStorage.getItem('latlng')){
        var latlng = JSON.parse(localStorage.getItem('latlng'))
        this.prayerTime(latlng.lat,latlng.lng)
      }else{
        this.showPrompt()
      }
      })       
  }

  prayerTime(lat,lng){       
     var Minutes = this.currTime()  
     console.log(lat,lng)
        this.prayers = this.azan.getPrayers([lat,lng],'MWL')
       
       this.pNames = Object.keys(this.prayers).splice(1, 4).concat(Object.keys(this.prayers).splice(6, 2))
         
        var vals =  (<any>Object).values(this.prayers).splice(1, 4).concat( (<any>Object).values(this.prayers).splice(6, 2))
        this.toMinutes= [].concat.apply([],this.splitTime(vals))
        
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

  currTime() {
    var currdate = new Date()
    return (currdate.getHours() * 60) + (currdate.getMinutes())
  }
  splitTime(data){   
    var conv = data.map((val,i,all) =>{
       var v1 = val.split(":")[0]
       var v2 = val.split(":")[1]
       var v22 = v2.split(" ")

       var arr = []
      if(v22[1] == "am"){
        var x = (parseInt(v1)*60)+parseInt(v2)
           arr.push(x)
      }else{
       
        if(all[i].split(":")[0] == 12){
          var y = (parseInt(v1)*60)+parseInt(v2)          
         arr.push(y)
        } else{
          var z = ((parseInt(v1)+12)*60)+parseInt(v2)          
          arr.push(z)
        }    
       
      }
      
       return arr
    })
   return conv
  }
  mapObj(name){   
    var min   
     Object.keys(this.prayers).map((data,i,arr) =>{      
      if(arr.indexOf(name[i])> -1){
        console.log(data)
        min = this.splitTime(data)
      } 
    })
   return min
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
            var mycity = this.toTitleCase(data.City)
            console.log(mycity);
            this.geoCode.forwardGeocode(mycity).then(res =>{
              alert(res)
              localStorage.setItem('latlng', JSON.stringify({lat:res[0].latitude, lng:res[0].longitude}))
            })
            
            this.getLocation()
          }
        }
      ]
    });
    prompt.present();
  }

  toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

}
