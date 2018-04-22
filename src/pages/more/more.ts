import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  items = [
    {
      title: 'Prayer Times',
      icon: 'clock',
      bg: '#FFC300',
      page: 'PrayersPage'
    },
    {
      title: 'Quran',
      icon: 'book',
      bg: '#FF334C',
      page: 'QuranPage'
    },
    {
      title: 'Mosques',
      icon: 'moon',
      bg: '#3383FF',
      page: 'MosquePage'
    },
    {
      title: 'Calender',
      icon: 'calendar',
      bg: '#ee42f4',
      page: 'CalenderPage'
    },
    {
      title: 'Adhkar',
      icon: 'document',
      bg: '#8DFF33',
      page: 'AdkharPage'
    },
    {
      title: 'Compass',
      icon: 'compass',
      bg: '#FF33E9',
      page: 'QiblaPage'
    },
    {
      title: 'Quotes',
      icon: 'heart',
      bg: '#FF334C',
      page: 'QuotesPage'
    },
    {
      title: '99 Names',
      icon: 'at',
      bg: '#f89b33',
      page: 'AsmaPage'
    },
    {
      title: 'Tasbih',
      icon: 'hand',
      bg: '#42f4df',
      page: 'TasbihPage'
    },
    {
      title: 'Makkah Live',
      icon: 'videocam',
      bg: '#f53d3d',
      page: 'VideosPage'
    },
    {
      title: 'Popular',
      icon: 'star',
      bg: '#663399',
      page: 'PopularPage'
    },
    {
      title: 'Saved',
      icon: 'bookmark',
      bg: '#FFC300',
      page: 'BookmarkPage'
    },
  ]
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  goto(page){
    console.log(page)
    this.navCtrl.push(page)
  }
}
