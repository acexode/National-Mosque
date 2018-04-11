import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
declare var cordova;
/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor(public notify: LocalNotifications, public plt: Platform) {
    console.log('Hello HelperProvider Provider');
  }

  toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
  forAlert(arr){
    console.log(arr)
    var d = new Date();
    d.setMinutes(30,0);
    d.setHours(4);
     
    var toMap = arr.map(time =>{
      var v1 = time.split(":")[0]
       var v2 = time.split(":")[1]
       var v22 = v2.split(" ")[0]
      return {h:v1,m:v22 }
    })
    this.notification(toMap)
  }
  notification(arr){
    var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate(),
    fajr = new Date(year,month,day,arr[0].h,arr[0].m),
    shurook = new Date(year,month,day,arr[1].h,arr[1].m),
    dhur = new Date(year,month,day,arr[2].h,arr[2].m),
    asr = new Date(year,month,day,parseInt(arr[3].h)+12,arr[3].m),
    magrib = new Date(year,month,day,parseInt(arr[4].h)+12,arr[4].m),
    isha = new Date(year,month,day,parseInt(arr[5].h)+12,arr[5].m);   
    
    if(this.plt.is('cordova')){
      
      (<any>cordova).plugins.notification.local.schedule([
        {
          
          id: 1,
          text: 'Time for Fajr',      
          led: 'F37B7B',             
          badge:1,
          //every:'day',
          sound: 'file://assets/sounds/azan1.mp3',
          trigger: { at: fajr }
        },
        {
          id: 7,
          text: 'Test ILocalNotification',      
          led: '#F37B7B',
          sound: "file://assets/sounds/azan1.mp3",         
          badge:1,
          //every:'day',
          firstAt: new Date(year,month,day, 0,18),
          //trigger: { at: new Date(year, month, day, 23,33) }
          },
        {
          id: 2,
          text: 'Time for Dhur',      
          led: 'F37B7B',               
          badge:1,
         //every:'day',
          sound: 'file://assets/sounds/azan1.mp3',        
          trigger: {at:dhur  }
        },
        {
          id: 3,
          text: 'Time for Asr',      
          led: 'F37B7B',               
          badge:1,
         //every:'day',
          sound: 'file://assets/sounds/azan1.mp3',        
          trigger: {at:asr  }
        },
        {
          id: 4,
          text: 'Time for Magrib',      
          led: 'F37B7B',               
          badge:1,
         //every:'day',
          sound: 'file://assets/sounds/azan1.mp3',        
          trigger: {at:magrib }
        },
        {
          id: 5,
          text: 'Time for Isha',      
          led: 'F37B7B',               
          badge:1,
         //every:'day',
          sound: 'file://assets/sounds/azan1.mp3',        
          trigger: {at:isha   }
        },
        
      ]);
     }
  }
 

}
