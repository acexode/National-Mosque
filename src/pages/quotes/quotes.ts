import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  galleryType = 'quotes';
  path= 'assets/gallery/'
  constructor(public navCtrl: NavController, public viewer: PhotoViewer, public file:File) {
  }

  ionViewDidLoad() {
    this.galleryType = 'quotes'
    console.log('ionViewDidLoad QuotesPage');
  }
    
    view(pic){     
      var imageName =  pic+'.jpeg';      
      const ROOT_DIRECTORY = 'file:///sdcard//';
      const downloadFolderName = 'tempDownloadFolder'; 
      this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
        this.file.copyFile(this.file.applicationDirectory + "www/assets/gallery/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
        .then(entries =>{
          this.viewer.show(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
          
        }).catch((error) => {
          alert('error ' + JSON.stringify(error));
        });
  
      }).catch((error) => {
        alert('error ' + JSON.stringify(error));
      });
      
    }
  
}
