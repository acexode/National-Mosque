import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  
*/
@Injectable()
export class ConnectionProvider {
  device : boolean
  constructor(public platform: Platform,public network:Network,public diagnostic: Diagnostic) {
    console.log('Hello ConnectionProvider Provider');
    this.device = this.platform.is('cordova')
  }
  isOnline():boolean{
    if(this.device && this.network.type){
       return this.network.type != 'none'
    }else{
      return navigator.onLine
    }
  }
  location(){
   return this.diagnostic.isLocationEnabled().then(val =>{
      return val
    })
    
  }
  isOffline():boolean{
    if(this.device && this.network.type){
       return this.network.type == 'none'
    }else{
      return !navigator.onLine
    }
  }
  watchOnline():any{
    return this.network.onConnect()
  }
  watchOffline():any{
    return this.network.onDisconnect()
  }

}
