import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AzanProvider } from '../../providers/azan/azan';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery'
//import cities from 'cities.json';
import { ConnectionProvider } from '../../providers/connection/connection';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import HijriDate,{toHijri} from 'hijri-date/lib/safe';
declare var UQCal
/**
 * Generated class for the PrayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prayers',
  templateUrl: 'prayers.html',
})
export class PrayersPage {
  @ViewChild('allPrayers') allPrayers : ElementRef
  months = [
    "",
    "Muḥarram",
    "Ṣafar",
    "Rabīʿ Al-awwal",
    "Rabīʿ Al-thānī",
    "Jumādá Al-ūlá",
    "Jumādá Al-ākhirah",
    "Rajab",
    "Shaʿbān",
    "Ramaḍān",
    "Shawwāl",
    "Dhū al-Qaʿdah",
    "Dhū al-Ḥijjah"
  ];
  prayers
  date
  title
  htoMins // convert to minutes
  pNames // prayer names
  shurook
  hijri
  greg
  maghrib
  toMinutes = []
  nextPrayerTitle 
  nextPrayerTime 
  fivePrayer = []
  constructor(
    public navCtrl: NavController,
    public azan: AzanProvider,
    public geo: Geolocation,
    public geoCode: NativeGeocoder,
    private localNotifications: LocalNotifications,
    public alertCtrl: AlertController,
    public connect: ConnectionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayersPage');    
    this.getLocation()  
    var cal = new UQCal()
    var HijriDate = cal.convert();
    console.log(HijriDate);
    const nowGreg = new Date();   
    this.hijri = HijriDate.Hday + ' ' + this.months[HijriDate.Hmonth] + ' ' + HijriDate.Hyear
    this.greg = nowGreg.toDateString()
    this.localNotifications.schedule([
      {
       id: 1,
        text: 'First ILocalNotification',
        firstAt: new Date(new Date().getTime() + 10000),
        led: 'F37B7B',
        every: 'day',
        badge:1,
        sound: 'file://assets/sounds/azan1.mp3',
        
     },
     {
      id: 2,
      text: 'Second ILocalNotification',
     // ,
      led: 'F37B7B',
      sound: "file://assets/sounds/azan1.mp3",
      every: 'day',
      badge:1,
      firstAt: new Date(new Date().getTime() + 60000),
      
      
      
      
   }
    ]);
    
  } 
  ionViewDidEnter() {
    this.getLocation()
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
            alert('my city is'+mycity)
            this.geoCode.forwardGeocode(mycity).then(res =>{ 
              alert(JSON.stringify(res))                       
              this.prayerTime(res[0].latitude,res[0].longitude)             
            })
      }else{
       this.showPrompt()
     }
      }
    })
   
  }
  prayerTime(lat,lng){        
     var Minutes = this.currTime()  
        this.prayers = this.azan.getPrayers([lat,lng],'MWL')
        let checked = [true,true,false,false,true,true] 
       this.pNames = Object.keys(this.prayers).splice(1, 4).concat(Object.keys(this.prayers).splice(6, 2))
         
        var vals =  (<any>Object).values(this.prayers).splice(1, 4).concat( (<any>Object).values(this.prayers).splice(6, 2))
        this.toMinutes= [].concat.apply([],this.splitTime(vals))
        console.log(this.toMinutes)
        this.sunrise(this.toMinutes)
        var temp = []
        this.pNames.map((name,index,arr)=>{
          if(Minutes < this.toMinutes[index]){
            temp.push(this.toMinutes[index])
            if(temp[0] == this.toMinutes[index]){  
              console.log(name)            
              this.nextPrayerTitle=  name
              this.nextPrayerTime=  this.prayers[name]
              this.fivePrayer.push({time: this.prayers[name], title: name,checked:checked[index],class:'active' })
            }else{
              this.fivePrayer.push({time: this.prayers[name], title: name,checked:checked[index],class:'not-active' })
            }
           
          }else if(Minutes > this.toMinutes[this.toMinutes.length-1]){
            temp.push(this.toMinutes[index])
            if(temp[0] == this.toMinutes[index]){
              console.log(name)
              this.nextPrayerTitle=  name
              this.nextPrayerTime=  this.prayers[name]
              this.fivePrayer.push({time: this.prayers[name], title: name,checked:checked[index],class:'active' })
            }else{
              this.fivePrayer.push({time: this.prayers[name], title: name,checked:checked[index],class:'not-active' })
            }
          }
          else{
            this.fivePrayer.push({time: this.prayers[name], title: name,checked:checked[index],class:'not-active' })
          }
         
        })
        this.shurook = this.fivePrayer[1].time
        this.maghrib = this.fivePrayer[4].time
        console.log(this.shurook)
        console.log(this.maghrib)
   } 

   // current time
  currTime() {
    var currdate = new Date()
    return (currdate.getHours() * 60) + (currdate.getMinutes())
  }
  // split time
  splitTime(data){   
    var conv = data.map((val,i,all) =>{
       var v1 = val.split(":")[0],
        v2 = val.split(":")[1],
        v22 = v2.split(" ")

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
  
  // get city manually
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'City',
      message: "Enable Location on your device or input your current city",
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

  toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  sunrise(arr){
    console.log(arr)
    var time = this.currTime()
    console.log(time)
    setInterval(()=>{
     if(time > arr[1] && time < arr[2]){
      $('.sunmoon .sun-animation').css('width', '25%');
      $('.sun-symbol-path').css('-webkit-transform', 'rotateZ(6deg)');
     }
     else if(time > arr[2] && time < arr[3]){
      $('.sunmoon .sun-animation').css('width', '50%');
      $('.sun-symbol-path').css('-webkit-transform', 'rotateZ(9deg)');
     }
     else if(time > arr[3] && time < arr[4] ){
      $('.sunmoon .sun-animation').css('width', '75%');
      $('.sun-symbol-path').css('-webkit-transform', 'rotateZ(30deg)');
     }
     else if(time == arr[4]  ){
      $('.sunmoon .sun-animation').css('width', '100%');
      $('.sun-symbol-path').css('-webkit-transform', 'rotateZ(72deg)');
     }
     else if(time > arr[4]  ){
      $('.sunmoon .sun-animation').css('width', '0%');
      $('.sun-symbol-path').css('-webkit-transform', 'rotateZ(-75deg)');
     }
    },1000)
    
  }

}
