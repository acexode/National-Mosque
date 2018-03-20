import { Component, NgZone,  ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { googlemaps } from 'googlemaps';
import { ConnectionProvider } from '../../providers/connection/connection';

/**
 * Generated class for the MosquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mosque',
  templateUrl: 'mosque.html',
})
export class MosquePage {
  @ViewChild('map') mapElement
  
  places = []
  map:any;
  latLng:any;
  markers:any;
  pleaseConnect: boolean = false;
  address;
  mapOptions:any;  
  isKM:any=500;
  isType:any="";
 
  constructor(
    private ngZone: NgZone,
    public connect: ConnectionProvider,
     private geolocation : Geolocation) {    
       
  }

  ionViewDidEnter() {
  //  if(this.connect.isOnline){
      this.loadMap();
  //  }else{
    //  this.pleaseConnect = true
  //  }
   console.log(this.places)
   
  }
  

  loadMap(){    
    if(this.connect.isOnline()){    
      this.pleaseConnect = false
   this.geolocation.getCurrentPosition().then((position) => {
   
    this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       console.log(position.coords.latitude,position.coords.longitude)
     
      this.mapOptions = {
        center: this.latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   
     
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      var service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: this.latLng,
        radius: 10000,
        types: ['mosque']
      },(results,status)=>{       
        this.ngZone.run(() => {
          this.places = results 
          
        });

        console.log(results)
        if (status === google.maps.places.PlacesServiceStatus.OK) {  
          
          for (var i = 0; i < results.length; i++) {   
            this.createMarker(results[i]);
            
          }
        }
        //this.callback(results,status)
      })
    }, (err) => {
      console.log('err '+JSON.stringify(err));
      

    });
  }else{
    this.pleaseConnect = true
  }
 
  }


 /*--------------------createmarker------------------------*/ 


  createMarker(place){  
    
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        console.log(place.name)
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }
  initMap(address) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    this.geolocation.getCurrentPosition().then((pos) => {
      var geocoder = new google.maps.Geocoder;
      var latlng = {lat: pos.coords.latitude, lng: pos.coords.longitude};        
      geocoder.geocode({'location':latlng}, (results,status)=>{
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: latlng
        });
        directionsDisplay.setMap(map);
        directionsService.route({
          origin: results[0].formatted_address,
          destination: address,
          travelMode: google.maps.TravelMode.DRIVING
          
        }, function(response, status) {
          if (status) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      })
    })
  }
 
  

}




  