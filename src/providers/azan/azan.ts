
import { Injectable } from '@angular/core';
import prayer from 'prayer'

/*
  Generated class for the AzanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AzanProvider {

  constructor() {
    console.log('Hello AzanProvider Provider');
    
  }

  getPrayers(latLng, method?){        
      console.log(latLng)
      if(method){
        prayer.setMethod(method)    
      }else{
        prayer.setMethod('MWL') 
      }
      var date = new Date()
      var tz:any = date.toTimeString().split(" ")[1].split("+")[1]
      return prayer.getTimes(new Date(), latLng, (tz/100))
   
  }

  convertJulian(){
    return prayer.julian(2018,2,19)
  }
  
}






