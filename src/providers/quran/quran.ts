import { Injectable } from '@angular/core';


import * as all from './path'
//import allSurah from './allsurah.json'
/*
  Generated class for the QuranProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuranProvider {
  constructor() {
    console.log('Hello QuranProvider Provider');
    
  }

  go(){
    //return all.singleSurah(5)
  }
  getSurahs(){
    console.log(all.allSurah())
  return all.allSurah()
  }
  getSurah(number){
    return all.singleSurah(number)   
   
  }
  getSurahEn(number){
    return  all.Translation(number)
  }
}
