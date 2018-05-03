//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionProvider } from '../../providers/connection/connection';
import { Geolocation } from '@ionic-native/geolocation';
import { Events,AlertController, Platform } from 'ionic-angular';
import cities from 'cities.json';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HelperProvider } from '../helper/helper';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  constructor(public alertCtrl: AlertController,
    public connect: ConnectionProvider,
    public geo: Geolocation,
    public platform: Platform,
    public geoCode: NativeGeocoder,
    public helper: HelperProvider,
    public events: Events,  ) {
    console.log('Hello SettingsProvider Provider');
  }

  countryCity(){
    this.connect.location().then(val =>{
      if(val){
        this.geo.getCurrentPosition().then((pos)=>{        
          if(this.platform.is('cordova')){           
          this.geoCode.reverseGeocode(pos.coords.latitude,pos.coords.longitude).then(res =>{                   
            this.events.publish('locality',res[0].countryName,res[0].locality)
            var city = [
              {
                lat:pos.coords.latitude,lng:pos.coords.longitude,
                country:res[0].countryName, name:res[0].locality
              }]    
              localStorage.setItem('mycity', JSON.stringify(city))
          }).catch(err =>{
            if(err){
              if(localStorage.getItem('mycity') !== null){
                var storedCity = JSON.parse(localStorage.getItem('mycity'))
                this.events.publish('latlng',storedCity[0].lat,storedCity[0].lng)
                this.events.publish('locality',storedCity[0].country,storedCity[0].name)
              }else{
                this.showPrompt()
              }
            }
            //alert('from countrycity '+JSON.stringify(err))
          })
        }
      })
  
      }
    })
    
   }
  getLocation(){   
    this.connect.location().then(val =>{          
      if(val == true){
        this.geo.getCurrentPosition().then((pos)=>{      
         this.events.publish('latlng',pos.coords.latitude,pos.coords.longitude)   
       }) 
      }else{
        if(localStorage.getItem('city') !== null){            
            var mycity = localStorage.getItem('city')      
            this.geoCode.forwardGeocode(mycity).then(res =>{                        
              this.events.publish('latlng',res[0].latitude,res[0].longitude)             
            }).catch(err =>{
              if(err){
                console.log(err)
                  this.showPrompt()
                
                
              }
              //alert('err from setting '+err)
            })
      }else{
       this.showPrompt()
     }
      }
    })      
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'City',
      message: "Enable GPS or Input your current city",
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
            mycity = mycity.trim()
            console.log(mycity);
            localStorage.setItem('city', mycity)
            let city = cities.filter(place =>{
                return place.name == mycity
            })
            localStorage.setItem('mycity', JSON.stringify(city))
            var storedCity = JSON.parse(localStorage.getItem('mycity'))
            this.events.publish('latlng',storedCity[0].lat,storedCity[0].lng)
            this.events.publish('locality',storedCity[0].country,storedCity[0].name)
              
          }
        }
      ]
    });
    prompt.present();
  }  


}
