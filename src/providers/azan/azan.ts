
import { Injectable } from '@angular/core';
//import * as Times from 'islamic-prayer-times'
declare var PrayTimes
/*
  Generated class for the AzanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AzanProvider {
   prayTimes = new PrayTimes();
  
  constructor() {
    console.log('Hello AzanProvider Provider');
  
  
    
  }

  getPrayers(latLng, method?){        
      console.log(latLng,method)
      if(method){
        this.prayTimes.setMethod(method)    
      }else{
        this.prayTimes.setMethod('MWL') 
      }
      var date = new Date()
      var tz:any = date.toTimeString().split(" ")[1].split("+")[1]
      return this.prayTimes.getTimes(new Date(), latLng, (tz/100))
   
  }

  convertJulian(){
    return this.prayTimes.julian(2018,2,19)
  }
  
}






