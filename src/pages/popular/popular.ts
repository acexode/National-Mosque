import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html',
})
export class PopularPage {
  kursi = ' Ayatul Kursi '
  popular = [
    {name:'  Surah Fatiha  ',
    index: 1
    },
    {name:'  Surah Baqarah ',
    index: 2
    },
    {name:'   Surah Yunus',
    index: 10
    },
      {name:'   Surah Yusuf',
      index: 12
      },
      {name:' Surah Kahf',
    index: 18
    },
    {name:' Surah Maryam',
    index: 19
    },
    {name:'Surah Yasin',
    index: 36
    },
    {name:' Surah Rahman',
    index: 55
    },
    {name:'   Surah Waqiah   ',
    index: 56
    },
    {name:' Surah Mulk',
    index: 67
    },
    
    {name:' Surah Muzamil',
    index: 73
    },
    
    {name:'  Surah Qadr',
    index: 97
     },
 
    {name:'   Surah Ikhlas',
    index: 112
    },
    {name:'   Surah Falaq',
    index: 113
    },
    {name:'   Surah Nas',
    index: 114
    },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopularPage');


  }
  goto(number){
    this.navCtrl.push('SurahPage',{
      number
    })
  }
  gotokursi(){

  }
}
