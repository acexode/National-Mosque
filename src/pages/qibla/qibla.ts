import { Component, ViewChild, } from '@angular/core';
import { IonicPage,  Platform } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery'
import { googlemaps } from 'googlemaps';

/**
 * Generated class for the QiblaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qibla',
  templateUrl: 'qibla.html',
})
export class QiblaPage {
  map:any;
  showValues = false;
  bearing: number;
  heading: number;
   lat =0
    long = 0;
   klat = 21.423063;
   klong = 39.825951;
   clat = this.klat;
   clong = this.klong;
   line
  
  @ViewChild('map_canvas') mapElement
  constructor( private geolocation: Geolocation,  private deviceOrientation: DeviceOrientation,   
    public plt: Platform) {}
  

  ionViewDidLoad() {

    this.initialize()
    console.log('ionViewDidLoad QiblaPage');
   
  }
  
  initialize() {
    this.geolocation.watchPosition().subscribe((pos) => {
 // data can be a set of coordinates, or an error (if an error occurred).
      this.lat = pos.coords.latitude
      this.long= pos.coords.longitude
      this.heading = Math.round(this.getBearing(this.klat,this.klong,this.lat,this.long))
    
      if(this.plt.is('cordova')){
          this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => 
        {
        
          var trueHeading = 360-data.trueHeading
          $('.compass').css('-webkit-transform', 'rotate('+ trueHeading +'deg)')
          $('.dip-needle').css('-webkit-transform', 'rotate('+ this.heading +'deg)')
          });
        }
        var mapCanvas = document.getElementById('map-canvas');

        var mapOptions = {
            center: new google.maps.LatLng(this.clat, this.clong),
            zoom: 2
            //mapTypeId: google.maps.MapTypeId.SATELLITE 
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var icon = 'assets/icon/marker.png';
        var qibla = 'assets/icon/qibla.png';


        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.klat, this.klong),
            map: map,
            icon: qibla
        });
        if (this.lat !== 0 && this.long !== 0) {
          console.log(this.lat,this.long)
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.lat, this.long),
                map: map,
                icon: icon
            });

            // Define the symbol, using one of the predefined paths ('CIRCLE')
            // supplied by the Google Maps JavaScript API.
            var lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 3,
                strokeColor: '#393'
            };

            // Create the polyline and add the symbol to it via the 'icons' property.
            this.line = new google.maps.Polyline({
                path: [{lat: this.lat, lng: this.long}, {lat: this.klat, lng: this.klong}],
                icons: [{
                    icon: lineSymbol,
                    offset: '100%'
                }],
                geodesic: true,
                strokeColor: '#393',
                map: map
            });

            //this.animateCircle(this.line);
        }
    });
   
    
}
// animateCircle(line) { 
//    var count = 0;
//    window.setInterval(function () {
//        count = (count + 1) % 200;

//        var icons = line.get('icons');
//        icons[0].offset = (count / 2) + '%';
//        line.set('icons', icons);
//    }, 100);
// }
 getBearing(klat,klong,lat,long){   
  return (this.rad2deg(Math.atan2(Math.sin(this.deg2rad(klong) - this.deg2rad(long)) * Math.cos(this.deg2rad(klat)), Math.cos(this.deg2rad(lat)) * Math.sin(this.deg2rad(klat)) - Math.sin(this.deg2rad(lat)) * Math.cos(this.deg2rad(klat)) * Math.cos(this.deg2rad(klong) - this.deg2rad(long)))) + 360) % 360;
}   
 deg2rad(angle) {     
  return (angle / 180) * Math.PI; //angle * .017453292519943295; // 
}
 rad2deg(angle) {   
  return angle / Math.PI * 180; //angle * 57.29577951308232; // angle / Math.PI * 180
}

  

}
