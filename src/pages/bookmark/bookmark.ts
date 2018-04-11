import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {
  allBookmarks = []
  constructor(public navCtrl: NavController,public NativeStore: NativeStorage) {
   
    // for(let i =0; i < localStorage.length; i++){
    //   this.allBookmarks.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    //   }
          
      // this.allBookmarks = this.allBookmarks.reduce((acc, val) => acc.concat(val), []);
      // console.log(localStorage.length)
        
      // alert(JSON.stringify(this.allBookmarks))
  }

  ionViewDidLoad() {
   
    this.NativeStore.keys().then(val =>{
      alert(val)
    })
  }

}
