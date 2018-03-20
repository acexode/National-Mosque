import { Injectable } from '@angular/core';
import { ConnectionProvider } from '../connection/connection';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the GmapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GmapProvider {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = ""
  constructor(
    public connect: ConnectionProvider, 
   // public goog: goo
    public geo: Geolocation) {
    console.log('Hello GmapProvider Provider');
    
  }
  

  // loadGoogleMap() {   
  //       if(this.connect.isOnline()){       
  //          this.enableMap();
    
  //       }else{
  //         this.disableMap()
  //       }    
 
  // }
  initMap(elem):Promise <any>{
   // this.loadGoogleMap()
    alert('hello world')
    return new Promise((resolve,reject)=>{
      this.geo.getCurrentPosition().then((pos)=>{
        let latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude)
        let options = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(elem,options)
        
        this.map.nearbySearch({
          location: latLng,
          radius: 10000,
          type: ['mosque']
      },(results, status)=>{
          alert(results)
          resolve(results)
      });
       
      })

    })
  }


  disableMap():void{
    if(this.pleaseConnect){
      //this.pleaseConnect.style.display = 'block'
    }

  }
  enableMap():void{
    if(this.pleaseConnect){
      //this.pleaseConnect.style.display = 'none'
    }

  }
  

}
